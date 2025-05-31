import { EventEmitter } from 'events';
import puppeteer, { Browser, Page } from 'puppeteer';
import { Agent, AgentConfig, AgentCapability, TaskResult } from '../types/agent';

export class BrowserAgent implements Agent {
  public readonly config: AgentConfig;
  public readonly events: EventEmitter;
  private browser: Browser | null = null;

  constructor() {
    this.config = {
      name: 'browser',
      description: 'Agent for web browsing and data extraction',
      capabilities: [
        {
          name: 'browse',
          description: 'Navigate to a URL and extract data using CSS selectors',
          parameters: {
            url: 'string',
            selector: 'string',
            waitForSelector: 'string?',
            extractAttribute: 'string?'
          }
        },
        {
          name: 'screenshot',
          description: 'Take a screenshot of a webpage',
          parameters: {
            url: 'string',
            fullPage: 'boolean?',
            path: 'string?'
          }
        }
      ]
    };
    this.events = new EventEmitter();
  }

  public async initialize(): Promise<void> {
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      timeout: 60000,
      ignoreDefaultArgs: ['--disable-extensions']
    });
    this.events.emit('status', { status: 'initialized' });
  }

  public async executeTask(task: string, params: Record<string, unknown>): Promise<TaskResult> {
    if (!this.browser) {
      throw new Error('Browser not initialized');
    }

    switch (task) {
      case 'browse':
        return this.executeBrowseTask(params);
      case 'screenshot':
        return this.executeScreenshotTask(params);
      default:
        throw new Error(`Unknown task: ${task}`);
    }
  }

  private async executeBrowseTask(params: Record<string, unknown>): Promise<TaskResult> {
    const { url, selector, waitForSelector, extractAttribute } = params as {
      url: string;
      selector: string;
      waitForSelector?: string;
      extractAttribute?: string;
    };

    const page = await this.browser!.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle0' });
      
      if (waitForSelector) {
        await page.waitForSelector(waitForSelector);
      }

      const elements = await page.$$(selector);
      const results = await Promise.all(
        elements.map(async (element) => {
          if (extractAttribute) {
            return element.evaluate(
              (el, attr) => el.getAttribute(attr),
              extractAttribute
            );
          }
          return element.evaluate(el => el.textContent);
        })
      );

      return {
        success: true,
        data: results.filter(r => r !== null)
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error as Error
      };
    } finally {
      await page.close();
    }
  }

  private async executeScreenshotTask(params: Record<string, unknown>): Promise<TaskResult> {
    const { url, fullPage = true, path } = params as {
      url: string;
      fullPage?: boolean;
      path?: string;
    };

    const page = await this.browser!.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle0' });
      const screenshot = await page.screenshot({ 
        fullPage, 
        path,
        encoding: path ? undefined : 'base64'
      });

      return {
        success: true,
        data: {
          screenshot: path ? path : screenshot
        }
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error as Error
      };
    } finally {
      await page.close();
    }
  }

  public getCapabilities(): AgentCapability[] {
    return this.config.capabilities;
  }

  public async cleanup(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
} 
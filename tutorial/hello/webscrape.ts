import axios from 'axios';
import * as cheerio from 'cheerio';
import log from "encore.dev/log";
import { hrtime } from 'process';
import puppeteer from 'puppeteer';



// Define an interface for the event structure
export interface Event {
  day: string;
  time: string;
  type: string;
  title: string;

}

async function getWebPage() {

/*
  (async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({headless: true,args: ['--no-sandbox', '--disable-setuid-sandbox'],
      dumpio: true,});
    const page = await browser.newPage();
  
    // Navigate the page to a URL
    await page.goto('https://experiencemontgomeryal.org/events/');
  
    // Set screen size
    await page.setViewport({width: 1080, height: 1024});
  
    const fullText = await page.evaluate(() => {
      // Get all text content from the <body> element
      return document.body.innerText.trim();
    });
    await browser.close();
  })();
*/
  return "<html>"
}

// Main function to fetch and parse events
export async function fetchEvents(): Promise<Event[]> {
  try {

   
    const html = await getWebPage()

    log.info("SSSSS")
    // Fetch the HTML content from the URL
    //const response = await axios.get('https://al.com');
    //const html = response.data;
    //log.info(JSON.stringify(response.data).substring(100,50));
   
    // Load HTML into cheerio for parsing
    const $ = cheerio.load(html);
    const events: Event[] = [];
    const headline = $('.article__details-headline .article__details-headline-text--h1').text().trim();
    log.info(headline)
    // Select event containers - adjust selector based on actual HTML structure
    $('.event-item').each((index, element) => {
      // Extract day - adjust selector as needed
      const day = $(element).find('.event-date').text().trim() || 'Not specified';
      
      // Extract time - adjust selector as needed
      const time = $(element).find('.event-time').text().trim() || 'Not specified';
      
      // Extract type - adjust selector as needed
      const type = $(element).find('.event-type').text().trim() || 'General';
      
      // Extract title - adjust selector as needed
      const title = $(element).find('.event-title').text().trim() || 'Untitled Event';

      // Add event to array
      events.push({
        day,
        time,
        type,
        title
      });
    });
    log.info("here XXXXX")
    console.log("HERE XXXX XXX ")
    log.info(JSON.stringify(events, null, 2))
    return events;

  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

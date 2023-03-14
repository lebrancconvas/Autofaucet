import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config(); 

const index = async() => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  });
  const page = await browser.newPage();

  await page.goto('https://faucet-sepolia.rockx.com/', { 'waitUntil': 'networkidle0' });

  const inputSelector = "input[placeholder='Paste the tweet URL here']";
  await page.waitForSelector(inputSelector);  
  await page.focus(inputSelector);
  if(typeof process.env.TWITTER_LINK === 'string') {
    await page.keyboard.type(process.env.TWITTER_LINK); 
  }

  const sendETHSelector = "button[class='w-full btn mt-4 sm:mt-0 sm:w-auto sm:ml-4  rounded-lg text-white bg-[#5442A7] py-3 px-4 text-center font-bold']";
  await page.waitForSelector(sendETHSelector);
  await page.click(sendETHSelector); 

  await browser.close(); 
};

index();
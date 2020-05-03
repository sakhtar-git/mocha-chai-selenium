
const {Builder, By, until} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const assert    = require('chai').assert;

const careers   = '[href="#careers"]';
const jobs      = 'a[href="/jobs"].button';
const engr      = '[class="heading-5"]'
const positions = 'a[href*="jobs"][class="link-4"]';

describe('Go to the Allergan data labs website', function() {
    let driver;
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://www.allergandatalabs.com');
    });
  
    it('Verify allergan data labs site and is up and running', async () => {
        let title = await driver.getTitle();
        assert(title === 'Allergan Data Labs', 'Title was not found as Allergan Data Labs');
    });

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    var mytext = (element) => {
        var textPromise = element.getText();
        textPromise.then((text) => console.log("\t"+text));
    }    

    it('Allergan Data Labs is Hiring', async () => {
        let element_jobs = await driver.findElement(By.css(jobs));
        element_jobs.click()
        //await sleep(5000); 
        let element_e = await driver.findElements(By.css(engr));
        let element_positions = await driver.findElements(By.css(positions));
        assert.isNotEmpty(element_positions,"There are no open postions");
        element_positions.forEach(mytext);        
    });

    after(async function(){
        await driver.quit();
    });

});


using System;
using Business;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.IE;
using System.Threading;

namespace UnitTestProject1
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            Calc calculate = new Calc();
            int val1 = 12;
            int val2 = 12;
            int result = calculate.Add(val1, val2);
            Assert.AreEqual(24,result);
        }

        [TestMethod]
        public void TestMethod2()
        {
            var driver = new InternetExplorerDriver();
            driver.Navigate().GoToUrl("http://localhost/test/test/index");
            driver.FindElementByXPath("//*[@id='val1']").SendKeys("22");
            driver.FindElementByXPath("//*[@id='val2']").SendKeys("22");
            driver.FindElementByXPath("/html/body/div[2]/form/div/div[3]/div/input").SendKeys(Keys.Enter);
            Thread.Sleep(2000);
            var result = driver.FindElementByXPath("/html/body/div[2]/h2").Text;
            Assert.AreEqual("44", result);
            driver.Dispose();

        }
    }
}

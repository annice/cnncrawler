var express = require('express');
var http = require('http');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var app     = express();


app.get('/scrape', function(req, res){

     
		var $ = cheerio.load(fs.readFileSync('cnn.html'));
		
		
    var section, title1, link1, title2, link2;
    
    var titles_links_arr=[];
	var author;
	var all_stories=[];



   
	
	
	/*Politics -Start*/
	titles_links_arr=[];
	var json = { section : "", main_img: "",top_stories:  [ {link: "",title:"",author:""}] };
$('div[class^="column zn__column--idx-3"]').find('ul > a > h2').each(function (index, element) {
  json.section=$(element).text();
 
});

var list = [];
$('div[class^="column zn__column--idx-3"]').find('ul > article > div > div > a >img').each(function (index, element) {
  json.main_img=$(element).attr('data-src-medium');
});

var i=0;

$('div[class^="column zn__column--idx-3"]').find('ul > article > div > div > h3 > a ').each(function (index, element) {
	var titles_links={section:"politics",main_img:json.main_img,id:"",link:"",title:"",author:"",release:"",source:"",content:""};
  titles_links.id=i++;
  titles_links.title=$(element).children('.cd__headline-text').text();
  titles_links.link="http://www.cnn.com"+$(element).attr('href');
 titles_links_arr.push(titles_links);
 
 request(titles_links.link, function(error, response, html){
    if(!error){
      
        var page = cheerio.load(html);
var page_var = { link : "", author: "",release:"", body:"" };
   

    page('.metadata__byline__author').filter(function(){
        var data = $(this);
        title = data.text();            
       
        page_var.author = title;
        titles_links.author=title;
       // json.release = release;
    })
    page('.update-time').filter(function(){
        var data = $(this);
        titles_links.release = data.text();            
      
       
    })
  
    page('.el-editorial-source').filter(function(){
        var data = $(this);
        titles_links.source = data.text();            
      
        
    })
    page('p[class=zn-body__paragraph]').filter(function(){
        var data = $(this);
        titles_links.content = data.text();            
     
       
    })
  page('div[class=zn-body__paragraph]').filter(function(){
        var data = $(this);
        titles_links.content = titles_links.content+data.text();            
     
       
    })

    
   

    fs.writeFile("politics"+(titles_links.id)+".json", "{\"politics\": ["+JSON.stringify(titles_links, null, 4)+"]}", function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})
  }

  })/*Req end*/


});


json.top_stories=titles_links_arr;
all_stories.push(json);

/*Politics - End*/

	/*Tech -Start*/
	titles_links_arr=[];
	var json = { section : "", main_img: "",top_stories:  [ {link: "",title:"",author:""}] };

json.section="Technology";
var list = [];
$('div[class^="item-container ob-recIdx-0"]').find('div >img').each(function (index, element) {
  json.main_img=$(element).attr('src');
});

var i=0;

$('a[class^="item-link-container"]').each(function (index, element) {
	var titles_links={section:"tech",main_img:json.main_img,id:"",link:"",title:"",author:"",release:"",source:"",content:""};
  titles_links.id=i++;
  
  
  $(element).find('div > div >img').each(function (index, element) {
  titles_links.title=$(element).attr('alt');
});
  
  titles_links.link=$(element).attr('href');
 titles_links_arr.push(titles_links);
 
 request(titles_links.link, function(error, response, html){
    if(!error){
      
        var page = cheerio.load(html);
var page_var = { link : "", author: "",release:"", body:"" };
   

    page('.byline').filter(function(){
        var data = $(this);
        title = data.text();            
       
        page_var.author = title;
        titles_links.author=title;
       // json.release = release;
    })
    page('.cnnDateStamp').filter(function(){
        var data = $(this);
        titles_links.release = data.text();            
      
       
    })
  
    page('.soc-twtname').filter(function(){
        var data = $(this);
        titles_links.source = data.text();            
      
        
    })
    page('h2').filter(function(){
        var data = $(this);
        titles_links.content = data.text();            
     
       
    })


    
   

    fs.writeFile("tech"+(titles_links.id)+".json", "{\"tech\": ["+JSON.stringify(titles_links, null, 4)+"]}", function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})
  }

  })/*Req end*/


});


json.top_stories=titles_links_arr;
all_stories.push(json);

/*Tech - End*/


  /*Opinion - start*/
  titles_links_arr=[];
  var json = { section : "", main_img: "",top_stories:  [ {link: "",title:"",author:""}] };
$('div[class^="column zn__column--idx-1"]').find('ul > a > h2').each(function (index, element) {
  json.section=$(element).text();
 
});

var list = [];
$('div[class^="column zn__column--idx-1"]').find('ul > article > div > div > a >img').each(function (index, element) {
  json.main_img=$(element).attr('data-src-medium');
});

var i=0;

$('div[class^="column zn__column--idx-1"]').find('ul > article > div > div > h3 > a ').each(function (index, element) {
  var titles_links={section:"opinion",main_img:json.main_img,id:"",link:"",title:"",author:"",release:"",source:"",content:""};
  titles_links.id=i++;
  titles_links.title=$(element).children('.cd__headline-text').text();
  titles_links.link="http://www.cnn.com"+$(element).attr('href');
 titles_links_arr.push(titles_links);
 
 request(titles_links.link, function(error, response, html){
    if(!error){
      
        var page = cheerio.load(html);
var page_var = { link : "", author: "",release:"", body:"" };
   

    page('.metadata__byline__author').filter(function(){
        var data = $(this);
        title = data.text();            
       
        page_var.author = title;
        titles_links.author=title;
       // json.release = release;
    })
    page('.update-time').filter(function(){
        var data = $(this);
        titles_links.release = data.text();            
      
       
    })
  
    page('.el-editorial-source').filter(function(){
        var data = $(this);
        titles_links.source = data.text();            
      
        
    })
    page('p[class=zn-body__paragraph]').filter(function(){
        var data = $(this);
        titles_links.content = data.text();            
     
       
    })
  page('div[class=zn-body__paragraph]').filter(function(){
        var data = $(this);
        titles_links.content = titles_links.content+data.text();            
     
       
    })

     

    fs.writeFile("opinion"+(titles_links.id)+".json", "{\"opinion\": ["+JSON.stringify(titles_links, null, 4)+"]}", function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})
  }

  })/*Req end*/


});


json.top_stories=titles_links_arr;
all_stories.push(json);

/*opinion--end*/


 /*Health - start*/
  titles_links_arr=[];
  var json = { section : "", main_img: "",top_stories:  [ {link: "",title:"",author:""}] };
$('div[class^="column zn__column--idx-5"]').find('ul > a > h2').each(function (index, element) {
  json.section=$(element).text();
 
});

var list = [];
$('div[class^="column zn__column--idx-5"]').find('ul > article > div > div > a >img').each(function (index, element) {
  json.main_img=$(element).attr('data-src-medium');
});

var i=0;

$('div[class^="column zn__column--idx-5"]').find('ul > article > div > div > h3 > a ').each(function (index, element) {
  var titles_links={section:"health",main_img:json.main_img,id:"",link:"",title:"",author:"",release:"",source:"",content:""};
  titles_links.id=i++;
  titles_links.title=$(element).children('.cd__headline-text').text();
  titles_links.link="http://www.cnn.com"+$(element).attr('href');
 titles_links_arr.push(titles_links);
 
 request(titles_links.link, function(error, response, html){
    if(!error){
      
        var page = cheerio.load(html);
var page_var = { link : "", author: "",release:"", body:"" };
   

    page('.metadata__byline__author').filter(function(){
        var data = $(this);
        title = data.text();            
       
        page_var.author = title;
        titles_links.author=title;
       // json.release = release;
    })
    page('.update-time').filter(function(){
        var data = $(this);
        titles_links.release = data.text();            
      
       
    })
  
    page('.el-editorial-source').filter(function(){
        var data = $(this);
        titles_links.source = data.text();            
      
        
    })
    page('p[class=zn-body__paragraph]').filter(function(){
        var data = $(this);
        titles_links.content = data.text();            
     
       
    })
  page('div[class=zn-body__paragraph]').filter(function(){
        var data = $(this);
        titles_links.content = titles_links.content+data.text();            
     
       
    })

     

    fs.writeFile("health"+(titles_links.id)+".json", "{\"health\": ["+JSON.stringify(titles_links, null, 4)+"]}", function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})
  }

  })/*Req end*/


});


json.top_stories=titles_links_arr;
all_stories.push(json);

/*health--end*/

 /*Sports - start*/
  titles_links_arr=[];
  var json = { section : "", main_img: "",top_stories:  [ {link: "",title:"",author:""}] };
$('div[class^="column zn__column--idx-0"]').find('ul > a > h2').each(function (index, element) {
  json.section=$(element).text();
 
});

var list = [];
$('div[class^="column zn__column--idx-0"]').find('ul > article > div > div > a >img').each(function (index, element) {
  json.main_img=$(element).attr('src');
});

var i=0;

$('div[class^="column zn__column--idx-0"]').find('ul > article > div > div > h3 > a ').each(function (index, element) {
  var titles_links={section:"sports",main_img:json.main_img,id:"",link:"",title:"",author:"",release:"",source:"",content:""};
  titles_links.id=i++;
  titles_links.title=$(element).children('.cd__headline-text').text();
  titles_links.link=$(element).attr('href');
 titles_links_arr.push(titles_links);
 
 request(titles_links.link, function(error, response, html){
    if(!error){
      
        var page = cheerio.load(html);
var page_var = { link : "", author: "",release:"", body:"" };
   

    page('.name').filter(function(){
        var data = $(this);
        title = data.text();            
       
        page_var.author = title;
        titles_links.author=title;
       // json.release = release;
    })
    page('.date').filter(function(){
        var data = $(this);
        titles_links.release = data.text();            
      
       
    })
  
    page('.title').filter(function(){
        var data = $(this);
        titles_links.source = data.text();            
      
        
    })
    page('p[class=htmlElement]').filter(function(){
        var data = $(this);
        titles_links.content = data.text();            
     
       
    })


   

    fs.writeFile("sport"+(titles_links.id)+".json", "{\"sport\": ["+JSON.stringify(titles_links, null, 4)+"]}", function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})
  }

  })/*Req end*/


});


json.top_stories=titles_links_arr;
all_stories.push(json);

/*Sport--end*/
 /*Entertainment - start*/
  titles_links_arr=[];
  var json = { section : "", main_img: "",top_stories:  [ {link: "",title:"",author:""}] };
$('div[class^="column zn__column--idx-6"]').find('ul > a > h2').each(function (index, element) {
  json.section=$(element).text();
 
});

var list = [];
$('div[class^="column zn__column--idx-6"]').find('ul > article > div > div > a >img').each(function (index, element) {
  json.main_img=$(element).attr('data-src-medium');
});

var i=0;

$('div[class^="column zn__column--idx-6"]').find('ul > article > div > div > h3 > a ').each(function (index, element) {
  var titles_links={section:"entertainment",main_img:json.main_img,id:"",link:"",title:"",author:"",release:"",source:"",content:""};
  titles_links.id=i++;
  titles_links.title=$(element).children('.cd__headline-text').text();
  titles_links.link="http://www.cnn.com"+$(element).attr('href');
 titles_links_arr.push(titles_links);
 
 request(titles_links.link, function(error, response, html){
    if(!error){
      
        var page = cheerio.load(html);
var page_var = { link : "", author: "",release:"", body:"" };
   

    page('.metadata__byline__author').filter(function(){
        var data = $(this);
        title = data.text();            
       
        page_var.author = title;
        titles_links.author=title;
       // json.release = release;
    })
    page('.update-time').filter(function(){
        var data = $(this);
        titles_links.release = data.text();            
      
       
    })
  
    page('.el-editorial-source').filter(function(){
        var data = $(this);
        titles_links.source = data.text();            
      
        
    })
    page('p[class=zn-body__paragraph]').filter(function(){
        var data = $(this);
        titles_links.content = data.text();            
     
       
    })
  page('div[class=zn-body__paragraph]').filter(function(){
        var data = $(this);
        titles_links.content = titles_links.content+data.text();            
     
       
    })

   

    fs.writeFile("entertainment"+(titles_links.id)+".json", "{\"entertainment\": ["+JSON.stringify(titles_links, null, 4)+"]}", function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})
  }

  })/*Req end*/


});


json.top_stories=titles_links_arr;
all_stories.push(json);

/*Entertainment--end*/


/*Travel - start*/
  titles_links_arr=[];
  var json = { section : "", main_img: "",top_stories:  [ {link: "",title:"",author:""}] };
$('div[class^="column zn__column--idx-7"]').find('ul > a > h2').each(function (index, element) {
  json.section=$(element).text();
 
});

var list = [];
$('div[class^="column zn__column--idx-7"]').find('ul > article > div > div > a >img').each(function (index, element) {
  json.main_img=$(element).attr('data-src-medium');
});

var i=0;

$('div[class^="column zn__column--idx-7"]').find('ul > article > div > div > h3 > a ').each(function (index, element) {
  var titles_links={section:"travel",main_img:json.main_img,id:"",link:"",title:"",author:"",release:"",source:"",content:""};
  titles_links.id=i++;
  titles_links.title=$(element).children('.cd__headline-text').text();
  titles_links.link="http://www.cnn.com"+$(element).attr('href');
 titles_links_arr.push(titles_links);
 
 request(titles_links.link, function(error, response, html){
    if(!error){
      
        var page = cheerio.load(html);
var page_var = { link : "", author: "",release:"", body:"" };
   

    page('.metadata__byline__author').filter(function(){
        var data = $(this);
        title = data.text();            
       
        page_var.author = title;
        titles_links.author=title;
       // json.release = release;
    })
    page('.update-time').filter(function(){
        var data = $(this);
        titles_links.release = data.text();            
      
       
    })
  
    page('.el-editorial-source').filter(function(){
        var data = $(this);
        titles_links.source = data.text();            
      
        
    })
    page('p[class=zn-body__paragraph]').filter(function(){
        var data = $(this);
        titles_links.content = data.text();            
     
       
    })
  page('div[class=zn-body__paragraph]').filter(function(){
        var data = $(this);
        titles_links.content = titles_links.content+data.text();            
     
       
    })

    

    fs.writeFile("travel"+(titles_links.id)+".json", "{\"travel\": ["+JSON.stringify(titles_links, null, 4)+"]}", function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})
  }

  })/*Req end*/


});


json.top_stories=titles_links_arr;
all_stories.push(json);

/*Travel--end*/



/*Faith & Religion - start*/
  titles_links_arr=[];
  var json = { section : "", main_img: "",top_stories:  [ {link: "",title:"",author:""}] };
$('div[class^="column zn__column--idx-8"]').find('ul > a > h2').each(function (index, element) {
  json.section=$(element).text();
 
});

var list = [];
$('div[class^="column zn__column--idx-8"]').find('ul > article > div > div > a >img').each(function (index, element) {
  json.main_img=$(element).attr('data-src-medium');
});

var i=0;

$('div[class^="column zn__column--idx-8"]').find('ul > article > div > div > h3 > a ').each(function (index, element) {
  var titles_links={section:"Faith & Religion",main_img:json.main_img,id:"",link:"",title:"",author:"",release:"",source:"",content:""};
  titles_links.id=i++;
  titles_links.title=$(element).children('.cd__headline-text').text();
  titles_links.link="http://www.cnn.com"+$(element).attr('href');
 titles_links_arr.push(titles_links);
 
 request(titles_links.link, function(error, response, html){
    if(!error){
      
        var page = cheerio.load(html);
var page_var = { link : "", author: "",release:"", body:"" };
   

    page('.metadata__byline__author').filter(function(){
        var data = $(this);
        title = data.text();            
       
        page_var.author = title;
        titles_links.author=title;
       // json.release = release;
    })
    page('.update-time').filter(function(){
        var data = $(this);
        titles_links.release = data.text();            
      
       
    })
  
    page('.el-editorial-source').filter(function(){
        var data = $(this);
        titles_links.source = data.text();            
      
        
    })
    page('p[class=zn-body__paragraph]').filter(function(){
        var data = $(this);
        titles_links.content = data.text();            
     
       
    })
  page('div[class=zn-body__paragraph]').filter(function(){
        var data = $(this);
        titles_links.content = titles_links.content+data.text();            
     
       
    })

     

    fs.writeFile("faithreligion"+(titles_links.id)+".json", "{\"faithreligion\": ["+JSON.stringify(titles_links, null, 4)+"]}", function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})
  }

  })/*Req end*/


});


json.top_stories=titles_links_arr;
all_stories.push(json);

/*Faith Religion--end*/



	

fs.writeFile('output.json', JSON.stringify(all_stories, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
res.send('Check your console!')

   
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;

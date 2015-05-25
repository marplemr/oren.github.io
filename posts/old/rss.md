## What every RSS publisher should do

![reader](http://4.bp.blogspot.com/-utB1KPeLN7Q/UQb-ZoECSLI/AAAAAAAADnw/nheaXiyD6ok/s1600/blog.png)

Every rss publisher should do this - when a request comes to get the rss xml file, return **Last-Modified** in the response header and add some simple logic in their server to return 304 instead of the whole xml file if nothing was changed since the last call (I'll explain in a second how to do that).  
It will save a lot of bandwidth and cpu cycles from rss readers. The reader will pass the Last-Modified value on every future request and the if there is nothing new to fetch he will get 304 with empty body and there is no need to download huge xml file and parse it.  

Here is an example for a site, the BBC, that is doing it right:

    curl http://feeds.bbci.co.uk/news/technology/rss.xml -v >  xml-file

=>

    HTTP/1.1 200 OK
    Last-Modified: Thu, 21 Mar 2013 15:35:31 GMT

(notice the Last-Modified was returned in the header and the body, xml-file, contain the feeds)


Let's copy paste the Last-Modified into the header of the second request, name the key If-Modified-Since:

    curl -v -H "If-Modified-Since: Thu, 21 Mar 2013 15:35:31 GMT" http://feeds.bbci.co.uk/news/technology/rss.xml > xml-file
=>

    HTTP/1.1 304 Not Modified

(and the body is empty)


So what the BBC are doing is comparing the If-Modified-Since with the Last-Modified (that they saved somewhere on their server).  
since it's identical they return 304 and empty body.

Thanks to [Dan MacTough](https://github.com/danmactough) for the help on this topic and for writing the awesome [node-feedparser package](https://github.com/danmactough/node-feedparser).  
More info can be found [here](http://fishbowl.pastiche.org/2002/10/21/http_conditional_get_for_rss_hackers/).



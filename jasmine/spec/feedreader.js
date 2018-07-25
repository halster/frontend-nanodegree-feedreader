/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('have URL', function(){
          for (let feed of allFeeds){
            expect(feed.url).toBeDefined();
            expect(feed.url).not.toBe('');
          };
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have defined name', function(){
           for(let feed of allFeeds){
             expect(feed.name).toBeDefined();
             expect(feed.name).not.toBe('');
           }
         })
    });


    describe('The menu', function() {


        /* This test ensures the menu element is
        * hidden by default.
        */
        it('is hidden by default', function(){
          const body = document.querySelector('body');
          expect(body.classList.contains('menu-hidden')).toBe(true);
        });

        /* This test checks that the menu changes when icon is clicked.
        */
        it('toggles between displaying and hidding when clicked', function(){
          const icon= document.querySelector('.menu-icon-link');
          const body = document.querySelector('body');
          icon.click();
          expect(body.classList.contains('menu-hidden')).toBe(false);
          icon.click();
          expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });


    describe('Initial Entries', function(){

        beforeEach(function(done) {
          loadFeed(0, done);
        });
        /* this test checks that when the loadfeed function is called and
        * completed that there is at least a single entry in the .feed container.
        * It does it by checking that the textcontent is not 0.
        */
        it('has an entry', function(){
            const feed = document.querySelector(".entry").textContent;
            expect(feed.length).not.toBe(0);
        });
    });

    /* for this test we call the loadfeed function two times and save
    * the textContent to a startFeed variable the first time and an
    * endFeed variable the second time.
    */
    describe('New Feed Selection', function(){
        var startFeed;
        var endFeed;
        beforeEach(function(done){
          loadFeed(0, function(){
            startFeed=document.querySelector('.feed').textContent;
            done();
          });
          loadFeed(1, function(){
            endFeed=document.querySelector('.feed').textContent;
            done();
          });
        });

      /* now we can check that the two variables are not the same which
      * which signifies that the feed has changed.
      */

      it('updates with new feed', function(){
        expect(startFeed).not.toBe(endFeed);
      });

    });

}());

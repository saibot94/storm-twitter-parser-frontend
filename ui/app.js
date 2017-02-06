Vue.use(VueResource);


Vue.component('tweet-result', {
    props: ['tweet'],
    template: '<tr><td>{{tweet.id}}</td><td>{{tweet.text}}</td>' +
    '<td>{{tweet.created_at}}</td><td>{{tweet.username}}</td><td>{{tweet.latitude}}</td>' +
    '<td>{{tweet.longitude}}</td></tr>'
});


Vue.component('tweet-place-result', {
    props: ['tweet'],
    template: '<tr><td>{{tweet.id}}</td><td>{{tweet.country}}</td>' +
    '<td>{{tweet.fullname}}</td><td>{{tweet.count}}</td>'
});

Vue.component('tweet-hashtag-result', {
    props: ['tweet'],
    template: '<tr><td>{{tweet.id}}</td><td>#{{tweet.text}}</td>' +
    '<td>{{tweet.count}}</td>'
});

var vm = new Vue({
    el: "#app",
    data: {
        tweets: [],
        tweetplaces: [],
        tweethashtags: [],
        pollServer: false
    },
    methods: {
        getTweetData: () => {
            vm.$http.get('/api/tweets').then(response => {
                vm.tweets = response.body;
                console.log("Loaded tweet data");
            });
        },
        getTweetPlaceData: () => {
            vm.$http.get('/api/tweets/places').then(response => {
                vm.tweetplaces = response.body;
                console.log("Loaded tweet place data");
            });
        },
        getTweethashtagData: () => {
            vm.$http.get('/api/tweets/hashtags').then(response => {
                vm.tweethashtags = response.body;
                console.log("Loaded tweet place data");
            });
        },
        doPoll: () => {
            if(vm.pollServer) {
                initTweets();
                console.log("Initiated server poll");
            } else {
                console.log("Disabled server polling mechanism");
            }
        }
    }
});

function initTweets() {
    vm.getTweetData();
    vm.getTweetPlaceData();
    vm.getTweethashtagData();
    if (vm.pollServer) {
        setTimeout(initTweets, 1500);
    }
}

initTweets();
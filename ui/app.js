var vm = new Vue({
    el: "#app",
    data: {
        isValid: true,
        message: 'This is rendered by Vue'
    },
    methods: {
        hello: () => {
            console.log("hello, world");
        }
    }
});


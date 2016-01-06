Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
    
    Meteor.startup(function () {
       //use Meteor.startup to render the component 
       ReactDOM.render(<App />, document.getElementById("render-target"));
        
    });
}
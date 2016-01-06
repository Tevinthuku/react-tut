App = React.createClass({
 // this mixin makes the getMteorData method work
 
 mixins: [ReactMeteorData],
 
 getInitialState() {
     return {
         hideCompleted: false
     }
 },
 
 //loads items from the task colection and puts them on this
 //data.tasks
 getMeteorData() {
   return {
       tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch()
   }  
 },
   
   renderTasks() {
        // Get tasks from this.data.tasks
       return this.data.tasks.map((task) => {
           return <Task key={task._id} task={task} />;
       });
   },
   
  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    var text = React.findDOMNode(this.refs.textInput).value.trim();
 
    Tasks.insert({
      text: text,
      createdAt: new Date() // current time
    });
 
    // Clear form
    React.findDOMNode(this.refs.textInput).value = "";
  },
   
   render() {
       return (
         <div className="container">
         
             <header>
                <h1>Todo List</h1>
                <form className="new-task" onSubmit={this.handleSubmit} >
                    <input
                     type="text"
                     ref="textInput"
                     placeholder="Type to add new Task" />
                </form>
             </header>
             
             <ul>
                {this.renderTasks()}
             </ul>
         </div>  
         );
   }
});
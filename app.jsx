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
     let query = {};
       if (this.state.hideCompleted) {
           query = {checked: {$ne: true}};
       }
       
   return {
       tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
       incompleteCount: Tasks.find({checked: {$ne: true}}).count()
   };  
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
  
    toggleHideCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted
        });
    
  },
   
   render() {
       return (
         <div className="container">
         
             <header>
                <h1>Todo List ({this.data.incompleteCount})</h1>
                <label>
                  <input
                    type="checkbox"
                    readOnly={true}
                    checked={this.state.hideCompleted}
                    onClick={this.toggleHideCompleted} />
                    Hide Completed Tasks
                </label>
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
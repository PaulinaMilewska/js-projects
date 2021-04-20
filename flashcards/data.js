const dataCSS = [
    {
        "What is CSS ?": "The full form of CSS is Cascading Style Sheets. It is a styling language which is simple enough for HTML elements. It is popular in web designing, and its application is common in XHTML also"
    }
    ,
    {
        "What is the origin of CSS ?" : "Standard Generalized Markup Language marked the beginning of style sheets in 1980s"
    },
    {
        "What is Pseudo-elements ?" : "Pseudo-elements are used to add special effects to some selectors.  CSS in used to apply styles in HTML mark-up. In some cases when extra mark-up or styling is not possible for the document, then there is a feature available in CSS known as pseudo-elements. It will allow extra mark-up to the document without disturbing the actual document"
    },
    {
        "How does Z index function?" : "Overlapping may occur while using CSS for positioning HTML elements. Z index helps in specifying the overlapping element. It is a number which can be positive or negative, the default value being zero"
    }
    ,
    {
        "What is Inline style?" : "The Inline style in a CSS is used to add up styling to individual HTML elements"
    }
    ,
    {   
        "How comments can be added in CSS?" : "The comments in CSS can be added with /* and */"
    }
    ,
    {
        "What is Alternate Style Sheet?" : "Alternate Style Sheets allows the user to select the style in which the page is displayed using the view>page style menu. Through Alternate Style Sheet, user can see a multiple version of the page on their needs and preferences"
    }
];

const dataHTML = [
    {
        "What is HTML?" : "HTML is short for HyperText Markup Language and is the language of the World Wide Web. It is the standard text formatting language used for creating and displaying pages on the Web. HTML documents are made up of two things: the content and the tags that format it for proper display on pages"
    },
    {
        "What are tags?" : "Content is placed in between HTML tags in order to properly format it. It makes use of the less than symbol (<) and the greater than symbol (>). A slash symbol is also used as a closing tag. For example: <strong>sample</strong>"
    },
    {
        "Do all HTML tags come in a pair?" : "No, there are single HTML tags that do not need a closing tag. Examples are the <img> tag and <br> tags"
    },
    {
        "What is an image map?" : "Image map lets you link to many different web pages using a single image. You can define shapes in images that you want to make part of an image mapping"
    },
    {
        "How do you insert a copyright symbol on a browser page?" : "To insert the copyright symbol, you need to type &copy; or & #169; in an HTML file"
    }
];

const dataJS = [
    {
        "Which company developed JavaScript?" : "Netscape is the software company that developed JavaScript"
    },
    {
        "What is a prompt box?" : "A prompt box is a box that allows the user to enter input by providing a text box. A label and box will be provided to enter the text or number"
    },
    {
        "What is 'this' keyword in JavaScript?" : "'This' keyword refers to the object from where it was called"
    },
    {
        "Does JavaScript support automatic type conversion?" : "Yes, JavaScript does support automatic type conversion. It is the common way of type conversion used by JavaScript developers"
    },
    {
        "What is called Variable typing in Javascript?" : "Variable typing is used to assign a number to a variable. The same variable can be assigned to a string"
    },
    {
        "What would be the result of 3+2+\"7\"?" : "Since 3 and 2 are integers, they will be added numerically. And since 7 is a string, its concatenation will be done. So the result would be 57"
    }
];

const dataREACT = [
    {
        "What is Reactjs?" : "React is a JavaScript library that makes building user interfaces easy. It was developed by Facebook"
    },
    {
        "What is Flux Concept In React?" : "Facebook widely uses flux architecture concept for developing client-side web applications. It is not a framework or a library. It is simply a new kind of architecture that complements React and the concept of Unidirectional Data Flow"
    },
    {
        "What is an action in Redux?" : "It is a function which returns an action object. The action-type and the action data are always stored in the action object. Actions can send data between the Store and the software application. All information retrieved by the Store is produced by the actions"
    },
    {
        "Explain the term stateless components" : "Stateless components are pure functions that render DOM-based solely on the properties provided to them"
    },
    {
        "Explain the term high order component" : "A higher-order component also shortly known as HOC is an advanced technique for reusing component logic. It is not a part of the React API, but they are a pattern which emerges from React’s compositional nature"
    },
    {
        "What are Props in react js?" : "Props mean properties, which is a way of passing data from parent to child. We can say that props are just a  communication channel between components. It is always moving from parent to child component"
    }
];

let i = 0;
function addData(data, category){
    data.forEach( (element => {
        for (const [question, answer] of Object.entries(element)) {
            fetch(`https://flashcards-ef26e-default-rtdb.firebaseio.com/data/${category}.json`, {
            method: "POST", //PUT 
            body: JSON.stringify({question, answer, index: i})
            })
        }
        i++;
    } ))
}

export {dataCSS, dataHTML, dataJS, dataREACT, addData};
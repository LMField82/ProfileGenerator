const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const pdf = require("html-pdf");

//const awesome = require("@fortawesome/fontawesome-free")


const colors = {
    green: {
      wrapperBackground: "#E6E1C3",
      headerBackground: "#C1C72C",
      headerColor: "black",
      photoBorderColor: "#black"
    },
    blue: {
      wrapperBackground: "#5F64D3",
      headerBackground: "#26175A",
      headerColor: "white",
      photoBorderColor: "#73448C"
    },
    pink: {
      wrapperBackground: "#879CDF",
      headerBackground: "#FF8374",
      headerColor: "white",
      photoBorderColor: "#FEE24C"
    },
    red: {
      wrapperBackground: "#DE9967",
      headerBackground: "#870603",
      headerColor: "white",
      photoBorderColor: "white"
    }
  };

function generateHTML(data) {
    console.log("data", data);
    return `<!DOCTYPE html>
  <html lang="en">
     <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
        <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
        <title>Document</title>
        <style>
            @page {
              margin: 0;
            }
           *,
           *::after,
           *::before {
           box-sizing: border-box;
           }
           html, body {
           padding: 0;
           margin: 0;
           }
           html, body, .wrapper {
           height: 100%;
           }
           .wrapper {
           background-color: ${colors[data.colors].wrapperBackground};
           padding-top: 100px;
           }
           body {
           background-color: white;
           -webkit-print-color-adjust: exact !important;
           font-family: 'Cabin', sans-serif;
           }
           main {
           background-color: #E9EDEE;
           height: auto;
           padding-top: 30px;
           }
           h1, h2, h3, h4, h5, h6 {
           font-family: 'BioRhyme', serif;
           margin: 0;
           }
           h1 {
           font-size: 3em;
           }
           h2 {
           font-size: 2.5em;
           }
           h3 {
           font-size: 2em;
           }
           h4 {
           font-size: 1.5em;
           }
           h5 {
           font-size: 1.3em;
           }
           h6 {
           font-size: 1.2em;
           }
           .photo-header {
           position: relative;
           margin: 0 auto;
           margin-bottom: -50px;
           display: flex;
           justify-content: center;
           flex-wrap: wrap;
           background-color: ${colors[data.colors].headerBackground};
           color: ${colors[data.colors].headerColor};
           padding: 10px;
           width: 95%;
           border-radius: 6px;
           }
           .photo-header img {
           width: 250px;
           height: 250px;
           border-radius: 50%;
           object-fit: cover;
           margin-top: -75px;
           border: 6px solid ${colors[data.colors].photoBorderColor};
           box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
           }
           .photo-header h1, .photo-header h2 {
           width: 100%;
           text-align: center;
           }
           .photo-header h1 {
           margin-top: 10px;
           }
           .links-nav {
           width: 100%;
           text-align: center;
           padding: 20px 0;
           font-size: 1.1em;
           }
           .nav-link {
           display: inline-block;
           margin: 5px 10px;
           }
           .workExp-date {
           font-style: italic;
           font-size: .7em;
           text-align: right;
           margin-top: 10px;
           }
           .container {
           padding: 50px;
           padding-left: 100px;
           padding-right: 100px;
           }
  
           .row {
             display: flex;
             flex-wrap: wrap;
             justify-content: space-between;
             margin-top: 20px;
             margin-bottom: 20px;
           }
  
           .card {
             padding: 20px;
             border-radius: 6px;
             background-color: ${colors[data.colors].headerBackground};
             color: ${colors[data.colors].headerColor};
             margin: 20px;
           }
           
           .col {
           flex: 1;
           text-align: center;
           }
  
           a, a:hover {
           text-decoration: none;
           color: inherit;
           font-weight: bold;
           }
  
           @media print { 
            body { 
              zoom: .75; 
            } 
           }
        </style>
        </head>
        <body>
    <header id="header"></header>
        <div class ="container">
            <div class="jumbotron" style="padding: 32px;">
                <img class="center" id="profileImage" src="https://via.placeholder.com/200">
                <div class="row">
                    <div class="col">
                        <h2 class="display-4" style="text-align: center;">Hi, I'm ${data.name}.</h2>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col">
                        <h3 style="text-align: center;">I work at ${data.company}</h3>        
                    </div>
                </div>
                <br><br>
                <div class="row justify-content-md-center">
                    <div class="col-sm-auto">
                        <h6><i class="fas fa-location-arrow"></i> Location</h6>
                        <a href="https://www.google.com/maps/place/${data.location}"></a>
                    </div>
                    <div class="col-sm-auto">
                        <h6><i class="fab fa-github-square"></i> GitHub</h6>
                        <a href="${data.html_url}"></a>
                    </div>
                    <div class="col-sm-auto">
                        <h6><i class="fas fa-rss"></i> Blog</h6>
                        <a href="${data.blog}"></a>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col">
                    <h2 class="center" style="text-align: center;">Bio here<a href="${data.bio}"></a></h2>
                </div>
            </div>
        <div class="container">    
            <div class="row justify-content-around">
                <div class="col-4 boxes">
                    
                        <h3>Public Repositories</h3>
                        <h5><a href="${data.repos_url}.length">Number here</a></h5>
                    
                </div>
                <div class="col-4 boxes">
                    
                        <h3>Followers</h3>
                        <h5><a href="${data.followers}">Number here</a></h5>
                   
                </div>
            </div>
            
            <div class="row justify-content-around">
                <div class="col-4 boxes">
                    
                        <h3>GitHub Stars</h3>
                        <h5><a href="${data.starred_url}">Number here</a></h5>
                    
                </div>
                <div class="col-4 boxes">
                    
                        <h3>Following</h3>
                        <h5><a href="${data.following}">Number here</a></h5>
                    
                </div>
            </div>
        </div>
    </div>
        <footer id="footer"></footer>
</body>
`
}

inquirer.prompt([
    {
        message: "What is your GitHub username?",
        type: "input",
        name: "githubUserName"
    },
    {
        message: "Pick your favorite color from the list.",
        type: "list",
        name: "colors",
        choices: ["pink", "blue", "green", "red"]
    }
]).then(({githubUserName, colors}) => {
        console.log("githubUserName", githubUserName);
        console.log("colors", colors);

    const queryUrl = `https://api.github.com/users/${githubUserName}`
      axios.get(queryUrl).then(function(response) {
            // console.log(response);

            fs.writeFile(response.data.login+".html", generateHTML({...response.data, ...{colors}}), function(err) {
                console.log("write", response.data.login+".html")
                if (err) {
                throw err;
                };

    
        });
    })

})
                      
                            
    



















// inquirer.prompt([
//     {
//     message: `What is your GitHub username?`,
//     name: "userName", 
//     },
//     {
//     message: `Pick a color.`,
//     type: "list",
//     choices: ["pink", "blue", "green", "red", "exit"],
//     name: "colorChoice"  

//     }
// ]);
//     (function({ userName }) {
//     const queryUrl = `https://api.github.com/users/${userName}/repos?per_page-100`;

//     axios.get(queryUrl).then(function(response) {
//         const repoNames = response.data.map(function(repo) {
//             return repo.name;
//         });

//         const repoNamesString = repoNames.join("\n");

//         fs.writeFile("data.txt", repoNamesString, function(err) {
//             if (err) {
//                 throw err;
//             }

//             console.log(`Saved ${repoNames.length} repos`)

//         });
//             }
//     )}
    
// );


// // const colorMenu = () => {
// // inquirer.prompt([
// //     {
// //     message: `Pick a color.`,
// //     type: "list",
// //     choices: ["purple", "pink", "blue", "green", "red", "exit"],
// //     name: "colorChoice"
// //     }
// // ]).then(({colorChoice}) => {
// //     switch(colorChoice) {

// //         case "pink":
// //             pink();
// //             break;
// //         case "blue":
// //             blue();
// //             break;
// //         case "green":
// //             green();
// //             break;
// //         case "red":
// //             red();
// //             break;
// //         default:
// //             console.log(`You have exited. Have a nice day.`)
// //     }
// // });
// // }

// // colorMenu();
# Progress

Progress is a habit tracker, bult using the MERN-stack, that allows users to track their daily progression of habits in various skills and subskills, while satisfying progressing in level and experience. Do you want to step on the road to progress?

![Screenshot](https://i.imgur.com/qkOSccQ.png)

## Getting Started:

To get started using progress. You can do one of two options:

- Compare activity with friends and foes on the online deployment at: https://prickly-bear-pocketbook.cyclic.app
- Clone or download the repository, ensure you have node.js and npm install all the modules, using npm run dev to use a local version. Unfortunately, you will have to change your database and have your own amazon aws to save.

### Logging In/Signing Up

The habit tracking capacities are stored on an online database. Thus, logging in is a must.

![Logging](https://i.imgur.com/eFvaMyd.png)

Users will only have access to the log in or sign up screens if they are not logged in. Just create an account or login to get the full features.

![Signup](https://i.imgur.com/GozRvWx.png)

### Creating Your skills

Once logged in, you'll have to create your first skill, which you can do so by clicking the "create new skill" button and then filling out all the relevant information. A photo is not required! It will render a default image if you forget to do so.

![Creating](https://i.imgur.com/oop1Yqi.png)

Once you have all your skills, which track the main brunt of your progression, you can create subskills.

These are mini skills that help track more specific areas. Say for example, you're getting better at music, a subskill might be guitar.
Clicking on the "add" button, switches the habit tracker to add mode, allowing you to add subskills, or habits. The other two modes are self explanatory. Clicking the same button twice will move everything to default.

![Subskills](https://i.imgur.com/Rl8wL03.png)

### Creating Your Habits

Now that you have a framework, here's where the most important part occurs, making your habits.

Choose a name, a description, the difficulty, a start date, end date, and whether the habit repeats and how often.

This will cause the habit to render when you're working on days that you should be doing the habit.

![AddingHabit](https://i.imgur.com/jhe1CvD.png)

### Functionality

With the habits squared away, you can start tracking. Clicking on the circle next to a habit will allow you to complete or uncomplete a habit.

Completing a habit will provide some experience (based on difficulty) for a skill, allowing you to "level up" as you keep working at something! This information will be stored in the side panel, which also houses a datepicker for changing which day you want to look at or track. If you want to filter by specific words the filter in the middle of the screen can do that, additionally, you can delete, edit, and add skill/subskills/habits as you see fit. You can even drag around the skills to reorder them! Isn't that neat!

![SideBar](https://i.imgur.com/xhY46W3.png)

Additionally, you can search for users in the search panel at the top right of the screen to find their profile pages, and also go to your profile page, choosing to look at the last 14 days of what you have accomplished! It's important to stay motivated and work with others. And feel free to edit your profile picture and bio if you want to.

![ProfilePage](https://i.imgur.com/ndQFeGS.png)

## Next Steps:

The core functionality is there, but it's important for habits to be social. I'd like to add a friends component with notifications, and friendly competiton in the future.

## Technologies Used

- Javascript
- Html
- CSS
- MongoDB
- Mongoose
- React
- Semantic
- Express
- Node.js
- Trello (https://trello.com/b/kzK4PbGO/progress-web-app-project)
# Demo app

## Getting started

```bash
git clone ...simplesurance.git
cd simplesurance
npm install
npm start
```

## The Task

To assess your skills we kindly ask you to implement a ReactJS web app that will load a list of questions (JSON provided) and provide the functionality for the user to reply to these questions and submit them all, once completed.

## Notes

- [x] Mock data provided (JSON)
- [x] You can include the provided JSON (data.json) in your project and load it from there.
- [x] Only 1 question should be displayed at a time.
- [x] Please provide the appropriate input control for the reply, depending on the type property of the question’s reply.
- [x] Once a user provides a reply (mandatory) to a question, navigate to the next question based on the next property of the question.
- [ ] If no input is provided or the input does not match the type property of that question, do not allow the user to proceed to the next question until they have provided a valid answer.
- [x] You can assume that the first question in the array of questions is the first question that should be displayed.
- [x] The final question will contain null as the value of the next property and this means that all the answered questions should now be submitted.
- [x] No real submission to any backend takes place - simply display all the questions and replies, which the user answered, on a new screen with the heading ‘Claim Submission’.
- [x] Please use Redux to manage your the state within your application.
- [x] The most important point is to just enjoy this challenge.

## What's next?

In this project, it was important to make sure the code was simple and reusable. I wanted this app to have SSR, CCS chunks and a connected router. That's why I used a custom webpack config where the router is linked with Redux. There are still some features I would add if I had more time:

- [ ] Write more tests
- [ ] Integrate design according to provided UI
- [ ] Prevent selection of future dates from date picker
- [ ] Fix broken list
- [ ] Add flow
- [ ] Add a real data API handler endpoint
- [ ] Fetch data on refresh
- [ ] Add Webpack alias
- [ ] Only use one webpack config
- [ ] Update page title
- [ ] Update Loader
- [ ] Add link to ReplyList `li`s
- [ ] Click on native go back/forward browser buttons displays previous replies
- [ ] Update browser compatibility

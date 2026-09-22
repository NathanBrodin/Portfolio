---
companyId: dnb
companyName: DNB
companyLogo: /company-logos/dnb.webp
companyWebsite: https://dnb.no

title: Frontend Engineer Intern
startDate: '2023-07'
endDate: '2023-08'
employmentType: Internship
icon: code
skills:
  - JavaScript
  - React
  - Redux
  - CSS

order: 4
---

Shipped an internal admin panel from scratch used by 10+ users, based on Figma designs. Small project with basic tech (CRA + JS), but good foundations. I handled everything from UI, API integration, auth, and deployment. My first production app.

<!-- more -->

---

I joined DNB for the first time as part of the summer internship cohort of 2023, with the "Emerging Technologies" team, and did 2 other internships in the same team later on.

## First Internship

From end of June to end of August 2023, I got assigned to work on the frontend of the "Chat Admin Panel". It was the summer between my 2nd and 3rd year of Engineering studies.
For context, DNB has multiple internal and external chatbots, which are domain specific chatbots to answer user questions. These are pre-LLM chatbots.
Each solution is owned by different teams and product owners across the bank. They all shared the same base, but had different themes, icons, help resources, pre-defined questions, which were stored internally in some AWS configs.
When these product owners wanted to change something for their chat solution, they had to contact the team, wait for a developer to mess with AWS to find what to change, and wait for the feedback. So I developed, from scratch, the frontend of the "Chat Admin Panel", which is a web app to empower the product owners to do the changes to their chatbots by themselves, in an intuitive way (we're not giving them raw access to AWS of course lol).

So I worked with the UX/UI designer of the team, that had all visuals of the application on Figma, and the backend engineer, that created the API to handle the data, and I was by myself on the frontend.

I started the project from scratch, with a bare CRA app in JavaScript, Emotion for styling, Redux for state, Axios for API calls. It was my first "real" React app, as I had only worked on a Chrome extension made with React before that, a simple "Password Manager".
So this was quite a simple CRUD app, with basic React Router navigation. It was not meeting the high production standards and modern stack that I now master, but this was still a very good application which received very good feedback.
One challenge was with styling: DNB has a component library ("Eufemia") that was the base of the app, but the Figma sketches modified it a lot, with different colors, spacings, and even light/dark mode... while the component library has not been built to be modified (like with shadcn/ui for example). So it was quite tricky to overwrite the CSS and make it consistent.
I also handled Microsoft auth and manual AWS deploy (S3 + CloudFront + Route 53 instead of Amplify).
This is the only project I worked on during that internship, me working alone on the frontend without code reviews or feedback, with a backend that was given, but lots of good back and forth with the designer. The project was not pushed to production yet.

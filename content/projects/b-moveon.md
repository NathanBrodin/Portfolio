---
id: b-moveon
title: B-moveOn
icon: bike
link: https://gitlab.esiea.fr/brodin/B-moveOn
type: school
startDate: '2023-09'
endDate: '2024-04'
skills:
  - Dart
  - Flutter
  - Riverpod
  - Supabase
  - OpenStreetMap
  - Fastlane
  - Figma
---

I built a mobile application in Flutter for delivery drivers on cargo bike, allowing them to input all their delivery points, with the app calculating the fastest route.

<!-- more -->

---

For the 1-year project of my 4th year. We built a full project for an external company, a Spanish company that produces cargo bikes, and they wanted an app for delivery drivers where they could enter all of the places they need to go, and the app would show the best path, and direct them during the ride.

So at the school we had the Spanish teacher as our mentor, who would connect us with the CEO of that company, and we also collaborated a lot with the local commune as it was a good use case for them. They basically had a few employees that would have to go to multiple compost places during some days of the week. This project was with two others, but for the code itself they didn't do anything, lazy af, so I built everything, I also had to prepare the presentations, reports... at least they came with me when we had the meetings and stuff.

With the local commune I remember we had a few workshops first to see their needs and how our app could help them, and on the last week we went with them on a tour to see if it was actually working, so we biked across the city with them, I remember the mentor following us in the car with one member of our team filming us biking so we could make a nice video.

The project started already the year before, and we were given the codebase of that group. To my surprise this was terrible, they basically did nothing, auth was fake, and nothing was working, so I rebuilt everything. Of course the mentor and CEO were non-technical, so they had the craziest requests to give to unpaid students, so this was a tough challenge to try to explain and defend stuff, like that I couldn't build on the previous foundations, explaining that things take time... Project management is something...

So for the non-technical part of project development, this was a very valuable time, as I got an excerpt into the real corporate world.

The app was Flutter with Supabase as the backend and Riverpod for state management. I started with the Google Maps API to trace the journey and calculate paths, but switched to OpenStreetMap during development. I also added a weather widget for the ride, and made the app available in French, English and Spanish (the CEO is Spanish after all). Made the UI first in Figma, looking really nice as always, and implemented it. The logo, it was a bike wheel, but with the colors of the maps journey, with the maps arrow, so it was a combination of the map and a wheel, genius.

Also deployed on the [Play Store](https://play.google.com/store/apps/details?id=fr.esiea.bmoveon) and [App Store](https://apps.apple.com/us/app/b-moveon/id6471257425), with CI/CD pipelines (Fastlane) to build and push releases automatically. Huge documentation, even some integration tests running on an Android emulator in the pipeline.

At the end of the year we had the project's fair, which we finished second once again, but this time there were two prizes: Jury and Public, second at both. But the local newspapers came to interview our project, and we got our own [article in the newspaper](https://www.ouest-france.fr/pays-de-la-loire/laval-53000/ces-etudiants-ingenieurs-de-laval-developpent-les-applications-du-quotidien-de-demain-7dc431b4-f281-11ee-bc38-55f66082c1a5)

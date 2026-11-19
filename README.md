# The AI sitting: the weekend timetable

Timetable, session guidance and deliberAIde links for facilitators at the Manchester sitting (27–29 November).

- `index.html` is the whole page (a copy of the Claude artifact "The weekend: timetable, sessions and links"; edit it there and copy it over).
- `firebase-config.js` is the public web config (the same Firebase project as the proposals page).
- `hosted.js` connects the page to Firebase. Facilitators only read; hosts sign in with the host passcode under DeliberAIde links → Edit links.
- `firestore.rules` is the whole Firestore rules file for the project (proposals, Session 8 and the timetable). Paste all of it into the console and Publish.

## Webflow

`webflow-embed.html` is the snippet for houseofthepeople.uk/timetable. Paste all of it into one Code Embed in a full-width section (not a Container), then publish. `houseofthepeople.uk/timetable#sat` opens Saturday; `#links` opens the links.

## GitHub Pages

Settings → Pages → Deploy from a branch → `main`, folder `/ (root)`.

Cricket Scoreboard Web Application – Report
Done by Vedith Vanam - 160123737207
1. Objective
The goal of this project was to design a simple, responsive cricket scoreboard using HTML, CSS, and JavaScript. The application simulates real-time scoring for two players (Rahul and Rohit), supporting runs, wickets, extras, overs, striker switching, and reset functionality.
2. Approach
The application is structured with HTML for layout, CSS for responsive design and visual clarity, and Vanilla JavaScript for state management and DOM updates.

State Model:
- Team runs, wickets, overs, balls (0–5), striker (Rahul/Rohit), freeHitNext (boolean).
- Player objects store runs, balls, and out status.

Rendering:
A central render() function updates the team score, overs, player statistics, and highlights the striker.

Event Handling:
- Runs update team and striker scores, increment balls, and switch striker on odd runs.
- Wickets increment the count, record striker balls, and reset striker to Rahul.
- Extras (wide, no ball, bye, leg bye) update runs with specific rules.
- Free Hit grants 1 run and protects the striker from dismissal on the next delivery.
- Manual striker switch and reset options are also supported.
3. Key Logic Details
Overs are updated after every 6 valid deliveries. Valid balls include runs, wickets, LBW, bye, and leg bye. Wides, no balls, and free-hit deliveries do not increment the ball count.

Free Hit Interpretation:
According to the assignment, free-hit deliveries do not count as balls and cannot dismiss the striker. Normal play resumes after that delivery.
4. Edge Cases Handled
- Maximum 10 wickets allowed; after this, inputs are ignored.
- Free hit protection ensures wickets do not count.
- Striker automatically switches on odd runs, manually via a button, or resets to Rahul after a wicket.
- Reset clears all state and UI.
5. Testing Per Requirement
- Runs update team and striker scores, odd runs switch striker.
- Wide/No Ball do not increment balls, Bye/Leg Bye do.
- Wicket/LBW increments wickets and valid balls, Rahul becomes striker.
- Overs update after every 6 valid balls.
- Free Hit works as per assignment instructions.
6. Challenges and Resolutions
The main challenge was interpreting the free-hit rule, as it differs from real cricket. The assignment wording was followed literally. State consistency was ensured by centralizing updates through a render() function. Ball increments and striker logic were carefully synchronized.
7. Assumptions
- After a wicket/LBW, Rahul is always the incoming batsman.
- No over or innings limit beyond 10 wickets.
- Extras are limited to +1 actions.
8. How to Run
Open index.html in any browser or use a local server such as VS Code Live Server.

Files:
- index.html - markup and controls
- styles.css - responsive styling
- script.js - logic and event handling
9. Future Scope
- Add strike rate and run rate tracking.
- Disable controls when innings is over.
- Implement undo for the last ball.
- Persist data using localStorage.

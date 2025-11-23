Genesis Liberation Calculator

This repository contains a self‑contained web application that helps MapleStory players estimate when they can liberate their Genesis weapons based on their current mission stage, the number of Traces of Darkness they have saved, and the bosses they plan to defeat each week/month.

Overview

The MapleStory Genesis liberation system requires players to accumulate a set number of Traces of Darkness through weekly and monthly boss fights. Each boss awards a fixed number of traces, which are divided equally among party members, and the Genesis Pass (if owned) triples the traces a player earns. The missions proceed through specific bosses in sequence—Lotus, Damien, Lucid, Will, Gloom, Darknell, Verus Hilla and Black Mage—requiring 500 or 1,000 traces per quest. Clearing all eight missions liberates the weapon and unlocks access to the Genesis weapon’s full power.

Several guides note the trace values for each boss difficulty and emphasize that traces are split evenly among party members. For example, Hard/Extreme Lotus and Hard Damien award 50 traces, Hard Lucid 65, Hard Will and Darknell 75, Hard Gloom 65 and Hard Verus Hilla 90. The Black Mage (Extreme mode) is a monthly boss awarding 600 traces. The Genesis Pass triples traces earned after division, and this bonus applies only to the pass holder.

The weekly bosses reset every Thursday at 12 AM PST, while the Black Mage resets on the first day of each month. Traces can be used immediately; there is no requirement to wait until a specific day of the week or month.

Application Features

Progress panel: Displays the target liberation date, a progress bar showing how many traces you’ve already accumulated, and detailed statistics including weekly traces, monthly traces, 4‑week totals, and expected liberation period.

Configuration panel: Lets you choose your current mission stage, specify the number of traces you already have, set a start date, and activate the Genesis Pass. Per‑boss cards allow you to select the difficulty you clear, the size of your party, and whether you’ve already cleared that boss this week or month.

Real‑time calculations: Uses the selected bosses, party sizes and Genesis Pass status to compute immediate trace gains and per‑reset trace acquisition. The calculator assumes the fastest possible sequence: if you clear a weekly boss mid‑week, it counts the immediate traces then starts counting resets from the following Thursday; similarly, Black Mage can be cleared near month‑end and again on the first of the next month.

Dark theme: Inspired by the MapleHub calculator, the layout uses a dark color scheme with card‑style boss rows, segmented difficulty buttons, toggle switches for tracking clears, and a clean progress panel on the left.

How to Use

Download or clone this repository. The application is contained in index.html along with embedded CSS and JavaScript.

Open index.html in a modern web browser (Chrome, Firefox, Edge). No additional server is required; all calculations run client‑side.

Configure your progress:

Select your current mission stage.

Enter the number of Traces of Darkness you already hold.

Set the start date (this should be the date you begin counting resets; by default the current date is used).

Toggle the Genesis Pass if you own it.

Choose bosses: For each boss you plan to clear, select the difficulty (e.g., Hard or Extreme), set your party size (solo or group), and indicate whether you’ve already cleared it during this reset period. Leaving a boss as “Not cleared” will apply its traces immediately for the first run.

Click Calculate: The progress panel will update with your weekly traces, monthly traces, total traces required, number of weekly resets needed, expected liberation period, and the projected date your weapon will be liberated.

Hosting as a Shareable Site

You can host this static site on GitHub Pages so others can access it without downloading files:

Commit the contents of this repository to your GitHub repo (e.g., RayRBM/Code) in a folder named docs or to the repository root (rename index.html accordingly).

Enable GitHub Pages in your repository settings, selecting the docs folder (or the root) as the source. GitHub will build the page and provide a URL of the form https://<your-username>.github.io/<repo-name>/ (for example, https://rayrbm.github.io/Code/). The .app domain you saw on MapleHub is just another static hosting service; GitHub Pages is free and integrates directly with your repository.

Share the link once GitHub Pages has deployed your site. The calculator will be fully functional via the browser.

Credits and Sources

This calculator was developed based on information from community guides and official patch notes. The trace values and Genesis Pass multiplier were referenced from MapleStory community guides and Nexon’s Genesis update notes. The weekly and monthly boss reset times follow the current MapleStory Global schedule.

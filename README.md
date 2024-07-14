# Urinal Game

---

## Introduction

The Urinal Game is a web game inspired by a TikTok trend. It is designed to be easy to understand and playable on any internet-connected device. If you need help understanding the game, refer to the user manual below.

---

## Manual

### Goal
Your goal is to select a urinal with as few neighbours as possible.

### States
<table>
    <tr>
        <th>Name</th>
        <th>Icon</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>FREE</td>
        <td><img src="./src/lightmode/urinal_free.png#gh-light-mode-only" width="32"><img src="./src/darkmode/urinal_free.png#gh-dark-mode-only" width="32"></td>
        <td>This state means that the urinal is free and can be selected by the user.</td>
    </tr>
    <tr>
        <td>OCCUPIED</td>
        <td><img src="./src/lightmode/urinal_occupied.png#gh-light-mode-only" width="32"><img src="./src/darkmode/urinal_occupied.png#gh-dark-mode-only" width="32"></td>
        <td>The urinal is currently occupied by a person and cannot be selected. Try to keep as much distance as possible from other people.</td>
    </tr>
    <tr>
        <td>UNAVAILABLE</td>
        <td><img src="./src/lightmode/urinal_unavailable.png#gh-light-mode-only" width="32"><img src="./src/darkmode/urinal_unavailable.png#gh-dark-mode-only" width="32"></td>
        <td>The urinal is not available due to a malfunction or other reasons. This urinal cannot be selected, but you don't need to keep distance from it.</td>
    </tr>
</table>

### How to select?
Each occupied urinal next to you is worth 2 points. A urinal on the edge is worth -1 point. Try to get as few points as possible!

---

## Calculation Procedure
The game calculates the points for each urinal as follows:

The procedure is as follows:

- Set the points variable to 0.
- Check if the urinal is on an edge:
    - If it is, subtract 1 from the points.
- Check if the left urinal is occupied:
    - If it is, add 2 to the points.
- Check if the right urinal is occupied:
    - If it is, add 2 to the points.

The urinal with the least points wins!
It is possible that more than one urinal is correct. In this case, any of the correct urinals will count as **the** correct one when clicked.
When a urinal was clicked, the site will instantly create a new game and not let you finish to click all correct urinals.

---

## Installation
No installation is required. Just open your web browser and visit the [website](https://urinalgame.netlify.app)!

---

## Cookies
We use cookies to enhance your browsing experience and to store your appearance preferences. This website only uses the following cookie:

- **Name**: `theme`
- **Purpose**: Stores the user's appearance preference (light or dark mode)
- **Duration**: 1 Month
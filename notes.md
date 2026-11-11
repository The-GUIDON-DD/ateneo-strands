# README
This is just a draft prototype of the game board while waiting for the design. Adding notes
here so I don't forget
# Gameboard
# Cell
Has props:
- coordinates (x, y with 0,0 at top left) (I can also put this in a redux state)
- ray-direction (up, down, left, right, up-left, up-right, down-left, down-right)
Has onClick/mouse down handler that sets current/selected index to that, sets ray direction to opposite of source cell
## Letter
Has:
- solved state (with color)
- unsolved state (without color)
- unselected state (no background)
## Ray
- direction
- solved/unsolved state (with/without color)
# Global state
- Has list of letters/indices (current word being spelled)
- If mouse down, add letter if adjacent or list is empty
- If mouse click, add letter if adjacent or list is empty OR reset list if invalid/non-adjacent cell is clicked
- may need global mousedown handler that flags if mouse down for this functionality
- Constant: Gameboard content (letters in multidimensional array)

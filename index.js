import { draw, fill, pick, rectangle } from "./tools";
import { Picture } from "./components/picture";
import { LoadButton } from "./components/load-button";
import { UndoButton } from "./components/undo-button";
import { SaveButton } from "./components/save-button";
import {
  ColorSelect,
  ToolSelect,
  PixelEditor,
} from "./components/pixel-editor";

const startState = {
  tool: "draw",
  color: "#000000",
  picture: Picture.empty(60, 30, "#f0f0f0"),
  done: [],
  doneAt: 0,
};

const baseTools = { draw, fill, rectangle, pick };

const baseControls = [
  ToolSelect,
  ColorSelect,
  SaveButton,
  LoadButton,
  UndoButton,
];

function startPixelEditor({
  state = startState,
  tools = baseTools,
  controls = baseControls,
}) {
  let app = new PixelEditor(state, {
    tools,
    controls,
    dispatch(action) {
      state = historyUpdateState(state, action);
      app.syncState(state);
    },
  });
  return app.dom;
}

document.querySelector("#root").appendChild(startPixelEditor({}))

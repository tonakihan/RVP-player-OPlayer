// ==UserScript==
// @name         RVP player: OPlayer
// @source       https://github.com/tonakihan/RVP-player-OPlayer
// @namespace    http://tampermonkey.net/
// @version      Alpha-v1
// @description  Support of OPlayer for RVP
// @author       tonakihan
// @match        http*://**/*
// @icon         https://img.icons8.com/?size=100&id=h1ELI6ISswGD&format=png&color=000000
// @require      https://cdn.jsdelivr.net/npm/@oplayer/core@latest/dist/index.min.js
// @require      https://cdn.jsdelivr.net/npm/@oplayer/ui@latest/dist/index.min.js
// @require      https://cdn.jsdelivr.net/npm/@oplayer/hls@latest/dist/index.min.js
// @grant        none
// @run-at       document-start
// ==/UserScript==
"use strict";

import OPlayer from "@oplayer/core";
import OUI from "@oplayer/ui";

const playerFunction: TPlayerFunction = (video, stockPlayer) => {
  if (isBlobUrl(video.src)) {
    alert("Error! Found 'blob' source which not support the video player.");
    console.error(
      "Error! Found 'blob' source which not support the video player.",
    );
  }

  const player = document.createElement("div");

  OPlayer.make(player, {
    source: {
      src: video.src,
      poster: video.poster,
    },
  })
    .use([OUI()])
    .create();

  // Marks the video as processed
  player.getElementsByTagName("video")[0]!.dataset.RVP_status = "processed";

  stockPlayer.replaceWith(player);
};

function isBlobUrl(url: string) {
  return url.startsWith("blob:");
}

function main() {
  if (!window.RVP_players) {
    window.RVP_players = [{ name: "OPlayer", function: playerFunction }];
  } else {
    window.RVP_players.push({ name: "OPlayer", function: playerFunction });
  }
}
main();

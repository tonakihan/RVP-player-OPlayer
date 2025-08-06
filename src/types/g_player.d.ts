export {};

declare global {
  interface Window {
    // Used for connection another custom players
    RVP_players?: [
      {
        name: string;
        function: TPlayerFunction;
      },
    ];
  }
}

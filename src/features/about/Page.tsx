import * as React from "react";

const Page = () => (
  <div className="container">
    <h2>About</h2>

    <p>Arul "Socrates" Aruldas is a wise old sage often given to spouting sayings that convey wisdom and knowledge far beyond his years.  It was felt that these gems could not be allowed to slip through the cracks.  Here they are preserved for posterity.  Noted down by the bystanders and witnesses to his greatness.</p>

    <p>Occasionally other colleagues comments have been jotted down as well. They exist to be a contrast the wisdom in Arul's sayings - we are not worthy!</p>

    <h3>About the app</h3>

    <p>Built using a combination of React, TypeScript and SignalR. Hosted on Azure.</p>

    <h3>Version</h3>

    <p>This is version: { __VERSION__ } </p>
  </div>
);

export default Page;

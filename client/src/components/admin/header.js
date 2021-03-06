import React from "react";

import { faKickstarterK } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AdminHeader() {
  return (
    <div class="header">
      <div class="icon">
        <i class="fab fa-kickstarter-k fa-6x">
          <FontAwesomeIcon icon={faKickstarterK}></FontAwesomeIcon>{" "}
        </i>
      </div>
      <div id="menuToggle">
        {/* <!--
            A fake / hidden checkbox is used as click reciever,
            so you can use the :checked selector on it.
            --> */}
        <input type="checkbox" />

        {/* <!--
            Some spans to act as a hamburger.
            
            They are acting like a real hamburger,
            not that McDonalds stuff.
            --> */}
        <span></span>
        <span></span>
        <span></span>

        {/* <!--
            Too bad the menu has to be inside of the button
            but hey, it's pure CSS magic.
            --> */}
        <ul id="menu">
          <a href="/admin/reports">
            <li>Reports</li>
          </a>
          <a href="/admin/verifications">
            <li>Verifications</li>
          </a>
        </ul>
      </div>
    </div>
  );
}

export default AdminHeader;

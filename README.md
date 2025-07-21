#### **Project: The Re-Think Tank**

**Architectural Overview**

This project uses a "Hub and Spoke" architecture to ensure maximum stability and development flexibility.

-   **The Hub (`/homepage`):** This is the main landing page. It is a simple, static site containing no complex application logic. Its only job is to be stable and direct users to the feature applications.
-   **The Spokes (`/feature-*`):** These are independent applications. Each directory (e.g., `feature-app`) is intended to be developed and deployed as a separate project. They are completely decoupled from the homepage.

**Deployment Strategy**

1.  **Homepage (`therethinktank.org`):** Deploy the contents of the `/homepage` directory to a static hosting provider (e.g., Vercel, Netlify, AWS S3). The `A` record for `therethinktank.org` should point to this deployment.
2.  **Features (Subdomains):** Each `feature-*` directory will be deployed as its own application. You must configure `CNAME` records in your DNS provider for each one.
    - `app` -> points to the deployment of the `feature-app`.
    - `blog` -> points to the deployment of the `feature-blog`.
    - `resources` -> points to the deployment of the `feature-resources`.

**Benefits of this Approach**

-   **Error Isolation:** A critical error in the `app` feature will have zero effect on the main domain or the `blog` feature.
-   **Technology Freedom:** The blog can be a WordPress site, the app can be a React app, etc. They do not share dependencies.
-   **Independent Development:** Teams can work on features independently without causing merge conflicts or breaking the main site. 
# The Haute Spot

Welcome to **The Haute Spot**, an exam project developed as a blog for a fictional fashion retailer. This project showcases both user and admin functionalities, designed and implemented using vanilla JavaScript, HTML, and CSS.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Client Profile](#client-profile)
3. [Features](#features)
4. [User Stories](#user-stories)
5. [Installation](#installation)
6. [Usage](#usage)
7. [Contributing](#contributing)
8. [License](#license)
9. [Contact](#contact)

## Project Overview

**The Haute Spot** is a blog for a fictional fashion retailer. The project is divided into two main sections:

- **User Side**: Allows visitors to view the blog posts.
- **Admin Side**: Allows the blog owner/admin to manage posts via a school-provided API.

The project is designed in FIGMA, managed using GitHub and Sourcetree, and deployed on Netlify.

## Client Profile

**Client Name**: The Haute Spot

**Sector**: Fashion Retail

**Size**: Medium-sized enterprise

**Location**: New York City, NY

**Mission**: "To inspire and empower individuals through high-quality, trendsetting fashion that combines style with substance."

The Haute Spot aims to be a leading name in the fashion industry, offering a curated selection of clothing and accessories for fashion-forward individuals. The blog serves as a platform to engage with their audience, share fashion tips, and showcase their latest collections.

## Features

### User Side
- **Index Page**: Displays a grid of blog posts.
- **Carousel**: Showcases the three latest posts at the top of the index page.
- **Single Post Page**: Users can view individual blog posts by clicking on them from the index page.

### Admin Side
- **Login/Signup**: Access to admin features via a specific link.
- **Post Management**:
    - View all posts in a grid layout (without the carousel).
    - Edit existing posts.
    - Delete posts.
    - Create new posts.
- **Post Preview**: Rough preview available before editing or creating new posts.

## User Stories

### Blog Feed Page

- **Interactive Banner Carousel**:
    - As a user, I want to see an interactive banner carousel on the blog feed page, so that I can view a rotation of the 3 latest posts.
    - As a user, I want to click on a button for each carousel item, taking me to the blog post page to read more.
    - As a user, I want to click on the previous or next button in the carousel to animate and reveal another post, to ensure I can see different posts easily.
    - As a user, I want the carousel to return to the first post after reaching the end of the list, and vice versa when clicking previous on the first post.
- **Static Post Grid**:
    - As a user, I want to view a static list of the 12 latest posts in a responsive thumbnail grid on the blog feed page, so I can easily select which post to read.
    - As a user, I want each thumbnail in the blog post feed to be clickable, taking me to the blog post page to read more.

### Blog Post Public Page

- **Responsive Layout**:
    - As a user, I want to see a responsive layout showing the post title, author, publication date, image banner, and post content from the API.
    - As a user, I want each blog page to have a shareable URL including a query string or hash parameter that contains the post ID, so I can share the post with others easily.

### Blog Post New Page

- **Authorized Access**:
    - As the owner, I want the blog post new page to be available only for me when logged in, to ensure no unauthorized edits can be made to my posts.
    - As the owner, I want a validated empty form that allows me to add the title, body content, and image, and POST those to the API to create a new post.

### Blog Post Edit Page

- **Authorized Access**:
    - As the owner, I want the blog post edit page to be available only for me when logged in, to ensure no unauthorized edits can be made to my posts.
    - As the owner, I want a delete button that sends a DELETE request to the API for this post ID on the edit page, so I can easily remove my post if needed.
    - As the owner, I want a validated edit form that allows me to update the title, body content, or image by sending a POST request to the API for this post ID, ensuring I can keep my posts up to date easily.

### Account Pages

- **Login Page**:
    - As the owner, I want a validated login form that allows me to request and save a token to my browser by entering my email and password, allowing me to manage posts.
- **Register Page**:
    - As the owner, I want a validated register form that allows me to create a new account by entering my name, email, and password.

## Installation

To run **The Haute Spot** locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone [repository URL]
    ```
2. Navigate to the project directory:
    ```bash
    cd the-haute-spot
    ```
3. Open `index.html` in your web browser to view the user side of the blog.

## Usage

### User Side
1. Open the [Netlify deployment URL](https://thehautespot.netlify.app/).
2. Browse the blog posts via the index page.
3. Click on any post to view its content.

### Admin Side
1. Access the admin login/signup page using the specific link provided.
2. Log in or sign up to access the admin features.
3. Use the interface to create, edit, or delete posts as needed.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or inquiries or access to the owner/admin side, please contact [Erica] at [erishe01272@stud.noroff.no].

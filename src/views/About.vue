<template>
    <div class="about">
      <body>
        <header>
          <ul class="navbar">
            <li><a href="./index.html">Home</a></li>
            <li><a href="#">World</a></li>
            <li><a href="#">Tech</a></li>
            <li><a href="#">Contact</a></li>
            <li class="profile-icon"><img src="../images/icon.svg" alt="profile icon" /></li>
          </ul>
        </header>

        <article>
          <h1>New ujpdar</h1>
          <section>
            <div class="img-container left column">
              <img src="../images/business.jpg" alt="A person reading the business section of a newspaper">
            </div>
            <div class="right column">
              <h2 class="headline">Headline</h2>
              <p class="content">
                I love cheese, especially manchego swiss. ☺ Fromage queso jarlsberg cheesy
                feet emmental cottage cheese camembert de normandie bocconcini. Cottage cheese
                everyone loves cauliflower cheese rubber cheese squirty cheese halloumi cow
                fondue. Bocconcini cheese and biscuits everyone loves fondue red leicester
                st. agur blue cheese rubber cheese ricotta. Cheesy grin mozzarella.
              </p>
            </div>
          </section>
          <section>
            <div class="left column">
              <h4 class="list-title">Trending Articles</h4>
              <ul class="vertical-list">
                <router-link to="/pages/article1" class="post-link">Article 1</router-link>
                <router-link to="/pages/article2" class="post-link">Article 2</router-link>
                <router-link to="/pages/article3" class="post-link">Article 3</router-link>
                <router-link to="/pages/article4" class="post-link">Article 4</router-link>
              </ul>
            </div>
            <div class="right column">
              <h4 class="list-title">Archived Posts</h4>
              <ul class="vertical-list">
                <router-link to="/pages/post1" class="post-link">Archived Post 1</router-link>
                <router-link to="/pages/post2" class="post-link">Archived Post 2</router-link>
                <router-link to="/pages/post3" class="post-link">Archived Post 3</router-link>
              </ul>
            </div>
          </section>
        </article>

        <footer>
          <a href="#" class="footer-link">Twitter</a>
          <a href="#" class="footer-link">Facebook</a>
          <a href="#" class="footer-link">Google+</a>
          <a href="#" class="footer-link">Digg</a>
        </footer>
      </body>
    </div>
</template>

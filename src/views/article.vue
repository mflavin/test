<template>
  <body>

    <header>
      <ul class="navbar">
        <li class="profile-icon"><img src="../images/icon.svg" alt="profile icon" /></li>
      </ul>
    </header>

    <article id="post">

      <section>

        <div class="img-container left column">
          <img src="../images/buildings.jpg" alt="Looking up at skyscrapers">
        </div>

        <div class="right column">
          <h2 class="headline">Article</h2>
          <p class="content">
            I love cheese, especially manchego swiss. ☺ Fromage queso jarlsberg cheesy
            feet emmental cottage cheese camembert de normandie bocconcini. Cottage cheese
            everyone loves cauliflower cheese rubber cheese squirty cheese halloumi cow
            fondue. Bocconcini cheese and biscuits everyone loves fondue red leicester
            st. agur blue cheese rubber cheese ricotta. Cheesy grin mozzarella.
          </p>
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
</template>
<script>
export default {
  name: 'article',
  mounted() {
    this.$parent.lastSixtyDays();
    this.$parent.lastNinetyDays();
  }
}
</script>

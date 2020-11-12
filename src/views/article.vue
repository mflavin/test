<template>
  <body>
    <header>
      <ul class="navbar">
        <li class="profile-icon"><img src="../images/icon.svg" alt="profile icon" /></li>
      </ul>
    </header>
    <table>
      <tr>
        <td>lastSixtyDaysDone: {{ $parent.lastSixtyDaysDone }}</td>
      </tr>
      <tr>
        <td>lastNinetyDaysDone: {{ $parent.lastNinetyDaysDone }}</td>
      </tr>
    </table>
    <div style="display: flex;">
      <div v-for="x in 5" style="margin: 0px 10px;">
        <select>
          <option disabled value="">Please select one</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
      </div>
    </div>
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
  mounted() {
    console.log('this, ', this);
    this.$parent.lastSixtyDays();
    this.$parent.lastNinetyDays();
  }
}
</script>

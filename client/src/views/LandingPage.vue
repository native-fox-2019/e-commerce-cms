<template>
    <div>
        <Navbar></Navbar>
        <div class="container" style="min-height:100vh;">
          <div style="display:flex; justify-content:center;">
            <div style="width:30%; padding: 2em 2em 0 0;">
              <div id="headline">
                Getting started with distance learning?
                Explore tips, strategies, and resources for distance learning from expert educators.
              </div>
              <hr>
              <p>Popular search</p>
              <ul id="shortcuts">
                <li>Mathematics</li>
                <li>Board games</li>
                <li>Puzzles</li>
                <li>Printables</li>
                <li>Novel studies</li>
                <li>Interactive</li>
                <li>Coloring</li>
                <li>Word cards</li>
              </ul>
            </div>
            <div style="display:flex; justify-content:center; width:70%;">
              <ItemList></ItemList>
            </div>
          </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import ItemList from '@/components/ItemList.vue';

export default {
  components: {
    Navbar,
    Footer,
    ItemList,
  },
};
</script>

<style scoped>
#headline {
  font-size: 1rem;
  font-style: italic;
  margin-bottom: 2em;
}

#shortcuts {
  padding: 0;
  margin: 0;
}

#shortcuts li {
  list-style-type: none;
  padding-left: 0.5em;
  margin-bottom: 0.3em;
  border-radius: 0.5em;
  font-size: 1rem;
}

#shortcuts li:hover {
  cursor: pointer;
  background: #b3b3b3;
}


</style>

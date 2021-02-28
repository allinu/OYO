<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <!-- NOTE LOGO -->
      <router-link class="navbar-brand" to="/OYO/home">
        <slot name="nav_logo">
          <i class="nf nf-dev-python"></i>
        </slot>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link fw-bold" to="/OYO/files"
              >文 件</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link fw-bold" to="/OYO/stars"
              >收 藏</router-link
            >
          </li>
          <!-- <li class="nav-item">
            <router-link class="nav-link fw-bold" to="/OAO/gallery"
              >代 码</router-link
            >
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'MemuBarBase',
}
</script>

<style scoped>
.navbar-brand {
  letter-spacing: 9px;
}
.nf {
  color: #de1a1a;
  font-size: 1.5em;
}
.navbar-brand,
.nav-item {
  padding-right: 20px;
}
.navbar-nav a.nav-link {
  color: black;
}
.navbar-nav a.nav-link.active {
  color: red;
}
</style>

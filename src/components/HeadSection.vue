<script setup></script>

<template>
  <nav>
    <RouterLink to="/">
      <img src="../assets/logo.svg" alt="dasdas logo" />
    </RouterLink>
    <ul>
      <li>
        <a href="#"><img src="./icon/twitter.svg" alt="twitter icon" /></a>
      </li>
      <li>
        <a href="#"><img src="./icon/dribbble.svg" alt="dribble icon" /></a>
      </li>
      <li>
        <a href="#"> <img src="./icon/figma.svg" alt="figma icon" /></a>
      </li>
      <li>
        <a href="#"><img src="./icon/github.svg" alt="github icon" /></a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
nav ul {
  display: flex;
}
nav ul li {
  list-style: none;
  align-self: center;
  margin-left: 22px;
}
</style>

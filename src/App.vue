<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="24">
          <el-menu default-active="/" mode="horizontal" router>
            <el-menu-item index="/" :route="{name: 'Home'}">Home</el-menu-item>
            <el-menu-item index="/about" :route="{name: 'About'}">About</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<style lang="scss">
@import '~@/assets/fonts/fonts.scss';

#app {
  font-family: Montserrat, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

h2 {
  text-align: center;
}

.location-form {
  width: fit-content;
  margin: 0 auto;
}
</style>

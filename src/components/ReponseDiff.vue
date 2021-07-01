<template>
  <section>
    <div>
      <code-diff
        id="diff"
        :old-string="fromatCode(oldJosn)"
        :new-string="fromatCode(newJson)"
        outputFormat="side-by-side"
        :context="10"
      >
      </code-diff>
    </div>
    </section>
</template>

<script>
import CodeDiff from "vue-code-diff";
export default {
  name: 'ReponstDiff',
  props: {
    oldJosn: String,
    newJson: String
  },
  components: { CodeDiff },
  methods: {
    fromatCode(val) {
      if (!val) return ''
      val = JSON.parse(val)
      return JSON.stringify(val, null, 2);
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
 
.hljs {
  background: none !important;;
}
.d2h-file-side-diff {
  background: #fff;
}
</style>
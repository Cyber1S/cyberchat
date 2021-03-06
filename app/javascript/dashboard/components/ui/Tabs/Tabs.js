export default {
  name: 'WoohTabs',
  props: {
    index: {
      type: Number,
      default: 0,
    },
  },
  render() {
    const Tabs = this.$slots.default
      .filter(
        node =>
          node.componentOptions &&
          node.componentOptions.tag === 'wooh-tabs-item'
      )
      .map((node, index) => {
        const data = node.componentOptions.propsData;
        data.index = index;
        return node;
      });
    return (
      <ul
        class={{
          tabs: true,
        }}
      >
        {Tabs}
      </ul>
    );
  },
};

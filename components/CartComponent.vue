<template>
  <div class="flex items-center flex-col">
    <div class="flex w-full justify-between mt-2">
      <div class="flex items-center">
        <span
          class="text-sm font-medium text-ellipsis overflow-hidden w-36 whitespace-nowrap"
          :title="title"
        >
          {{ title }}
        </span>
      </div>
      <div class="flex items-center">
        <div class="flex items-center justify-between">
          <button
            @click="$emit('decrease')"
            class="text-gray-500 text-sm font-medium px-1 py-1 rounded-full shadow-md hover:bg-[#3e40bf] hover:text-white transition-all duration-100"
          >
            <MdiIcon name="minus" :size="20" />
          </button>
          <span class="text-sm w-6 text-center">{{ quantity }}</span>
          <button
            @click="$emit('increase')"
            class="text-gray-500 text-sm font-medium px-1 py-1 rounded-full shadow-md hover:bg-[#3e40bf] hover:text-white transition-all duration-100"
          >
            <MdiIcon name="plus" :size="20" />
          </button>
        </div>
      </div>
    </div>
    <div class="flex w-full">
      <div class="flex">
        <div class="text-sm font-medium flex">
          <span class="mr-1">$</span>
          <span class="text-right flex-grow">{{ price * quantity }}</span>
        </div>
      </div>
    </div>
    <hr class="w-full mt-2" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
};
</script>

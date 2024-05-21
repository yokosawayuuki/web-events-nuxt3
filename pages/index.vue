<template>
  <div class="md:max-w-[1040px] py-[60px] px-5 mx-auto">
    <h1 class="mb-4 text-3xl font-bold title">Web制作関連オンラインイベント</h1>
    <a
      class="border border-[#1A73E8] px-5 py-2.5 mb-2.5 text-sm text-white md:hover:text-[#1A73E8] bg-[#1A73E8] md:hover:bg-white inline-block transition-all duration-300"
      v-text="`Googleカレンダーに登録する`"
      href="https://calendar.google.com/calendar/u/0?cid=NTM4MmRhNWExMDk3OTU5NDA2NmQ3Y2M4NDJjMGQ2N2I2MzcwYzQ1NjExNmRmNDBhNDliMWYyY2UxZjVlYTc2ZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
      target="_blank"
    />
    <p
      class="mb-12"
      v-text="`※Googleカレンダーに登録すると、ご自身のGoogleカレンダーに自動的に反映されます。`"
    />
    <div v-if="events.length">
      <ul id='resultArea' class="border-t border-solid border-[#333]">
        <!-- <li v-for="event in events" :key="event.id"> -->
          <!-- {{ event.summary }} - {{ new Date(event.start.dateTime).toLocaleString() }} -->
        <!-- </li> -->

        <li
          class="py-5 border-b border-solid border-[#333]"
          v-for="item in events"
          :key="item.id"
        >
          <h2
            class="mb-1 text-xl font-bold"
            v-text="item.summary"
          ></h2>
          <div class="flex gap-x-2.5 mb-2.5">
            <time>{{ formatDate(item.start.dateTime) }}</time>〜<time>{{ formatDate(item.end.dateTime) }}</time>
          </div>
          <p
            v-if="item.aTag"
            v-html="item.aTag"
            style="word-wrap: break-word;"
          ></p>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No upcoming events.</p>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';

  const events = ref([]);

  const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}/${month}/${day} ${hours}:${minutes}`;
}

  const fetchEvents = async () => {
    try {
      const eventsData = await $fetch('/api/events');
      events.value = eventsData;
    } catch (error) {
      console.error('Failed to fetch events', error);
    }
  };

  onMounted(() => {
    fetchEvents();
  });
</script>
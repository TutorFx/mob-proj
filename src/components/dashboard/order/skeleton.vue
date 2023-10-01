<template>
    <div class="card bg-base-100">
      <div class="card-body p-6">
        <div class="grid grid-cols-[max-content_1fr] gap-2 lg:gap-6">
          <label class="block">
            <div type="checkbox"
              class="checkbox checkbox-primary border-base-content border-dashed hover:border-base-content checked:border-primary" />
          </label>
          <div class="grid gap-4">
            <div class="flex gap-2 items-center">
                <span class="isloading h-6 w-24 rounded-md" />
                <span class="isloading h-6 w-16 rounded-md" />
                <span class="isloading h-6 w-20 rounded-md" />
            </div>
            <div class="flex gap-2">
                <span class="isloading h-24 w-24 rounded-md" />
                <span class="isloading h-6 w-20 rounded-md" />
                <span class="isloading h-6 w-48 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
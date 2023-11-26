<template>
    <div class="card bg-base-100">
      <div class="card-body p-6">
        <div class="grid grid-cols-[max-content_1fr] gap-2 lg:gap-6">
          <label class="block">
            <div
type="checkbox"
              class="checkbox checkbox-primary border-dashed border-base-content checked:border-primary hover:border-base-content" />
          </label>
          <div class="grid gap-4">
            <div class="flex items-center gap-2">
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
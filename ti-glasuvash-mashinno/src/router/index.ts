import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomePage.vue')
  },
  {
    path: '/vote-options',
    name: 'Vote options',
    component: () => import('@/views/VoteOptionsPage.vue')
  },
  {
    path: '/preview-vote-option',
    name: 'Preview vote option',
    component: () => import('@/views/PreviewVoteOptionPage.vue')
  },
  {
    path: '/candidates',
    name: 'Candidates',
    component: () => import('@/views/CandidatesPage.vue')
  },
  {
    path: '/parties',
    name: 'Parties',
    component: () => import('@/views/PartiesPage.vue')
  },
  {
    path: '/parties-eu',
    name: 'PartiesEU',
    component: () => import('@/views/PartiesPage.vue')
  },
  {
    path: '/preview',
    name: 'Preview',
    component: () => import('@/views/PreviewPage.vue')
  },
  {
    path: '/vote',
    name: 'Vote',
    component: () => import('@/views/VotePage.vue')
  },
  {
    path: '/vote-confirmation',
    name: 'Vote confirmation',
    component: () => import('@/views/VoteConfirmationPage.vue')
  },
  {
    path: '/remove-card',
    name: 'Remove card',
    component: () => import('@/views/RemoveCardPage.vue')
  },
  {
    path: '/empty-vote',
    name: 'Empty vote',
    component: () => import('@/views/EmptyVotePage.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

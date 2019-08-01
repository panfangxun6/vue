export default [
  {
    path: '/admin',
    component: () => import('../packages/ui/container'),
    children: [{
      path: '/',
      name: 'admin',
      component: () => import('../view/HelloWorld')
    },
    {
      path: '/example',
      name: 'example',
      component: () => import('../view/client/example')
    }
    ]
  }

]

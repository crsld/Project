// Modules that have a station QR code. Each station's QR carries its module number
// (code SCANSHIP-MODULE-<n>); after log in / sign up the user is sent to that module's page.
//
// Add a module's route here once its page exists (modules without a route yet send the
// user to the modules list instead).
export const MODULE_IDS = [1, 2, 3, 4]

export const MODULE_ROUTES = {
  1: '/module/1',
  // 2: '/module/2',
  // 3: '/module/3',
  // 4: '/module/4',
}

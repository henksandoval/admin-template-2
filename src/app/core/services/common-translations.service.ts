import { Injectable } from '@angular/core';

/**
 * Service that provides common translations used across the application.
 * This centralizes frequently used strings to avoid duplication and ensure consistency.
 */
@Injectable({
  providedIn: 'root'
})
export class CommonTranslationsService {

  /**
   * Common button labels
   */
  readonly buttons = {
    save: $localize`:@@common.button.save:Save`,
    cancel: $localize`:@@common.button.cancel:Cancel`,
    edit: $localize`:@@common.button.edit:Edit`,
    delete: $localize`:@@common.button.delete:Delete`,
    add: $localize`:@@common.button.add:Add`,
    create: $localize`:@@common.button.create:Create`,
    update: $localize`:@@common.button.update:Update`,
    submit: $localize`:@@common.button.submit:Submit`,
    back: $localize`:@@common.button.back:Back`,
    next: $localize`:@@common.button.next:Next`,
    previous: $localize`:@@common.button.previous:Previous`,
    close: $localize`:@@common.button.close:Close`,
    confirm: $localize`:@@common.button.confirm:Confirm`,
    viewAll: $localize`:@@common.button.viewAll:View All`,
    uploadFile: $localize`:@@common.button.uploadFile:Upload File`,
    download: $localize`:@@common.button.download:Download`,
    import: $localize`:@@common.button.import:Import`,
    export: $localize`:@@common.button.export:Export`
  };

  /**
   * Common status messages
   */
  readonly status = {
    loading: $localize`:@@common.status.loading:Loading...`,
    saving: $localize`:@@common.status.saving:Saving...`,
    saved: $localize`:@@common.status.saved:Saved successfully`,
    error: $localize`:@@common.status.error:An error occurred`,
    success: $localize`:@@common.status.success:Operation completed successfully`,
    noData: $localize`:@@common.status.noData:No data available`,
    notFound: $localize`:@@common.status.notFound:Not found`
  };

  /**
   * Common form field labels and messages
   */
  readonly form = {
    required: $localize`:@@common.form.required:This field is required`,
    email: $localize`:@@common.form.email:Email`,
    password: $localize`:@@common.form.password:Password`,
    confirmPassword: $localize`:@@common.form.confirmPassword:Confirm Password`,
    firstName: $localize`:@@common.form.firstName:First Name`,
    lastName: $localize`:@@common.form.lastName:Last Name`,
    name: $localize`:@@common.form.name:Name`,
    phone: $localize`:@@common.form.phone:Phone`,
    address: $localize`:@@common.form.address:Address`,
    city: $localize`:@@common.form.city:City`,
    country: $localize`:@@common.form.country:Country`,
    dateOfBirth: $localize`:@@common.form.dateOfBirth:Date of Birth`,
    age: $localize`:@@common.form.age:Age`,
    invalidEmail: $localize`:@@common.form.invalidEmail:Please enter a valid email address`,
    passwordTooShort: $localize`:@@common.form.passwordTooShort:Password must be at least 8 characters long`,
    passwordsDoNotMatch: $localize`:@@common.form.passwordsDoNotMatch:Passwords do not match`
  };

  /**
   * Common navigation labels
   */
  readonly navigation = {
    dashboard: $localize`:@@common.nav.dashboard:Dashboard`,
    profile: $localize`:@@common.nav.profile:Profile`,
    settings: $localize`:@@common.nav.settings:Settings`,
    logout: $localize`:@@common.nav.logout:Logout`,
    home: $localize`:@@common.nav.home:Home`,
    users: $localize`:@@common.nav.users:Users`,
    reports: $localize`:@@common.nav.reports:Reports`,
    components: $localize`:@@common.nav.components:Components`,
    showcase: $localize`:@@common.nav.showcase:Showcase`
  };

  /**
   * Common table headers and actions
   */
  readonly table = {
    name: $localize`:@@common.table.name:Name`,
    email: $localize`:@@common.table.email:Email`,
    role: $localize`:@@common.table.role:Role`,
    status: $localize`:@@common.table.status:Status`,
    actions: $localize`:@@common.table.actions:Actions`,
    createdAt: $localize`:@@common.table.createdAt:Created At`,
    updatedAt: $localize`:@@common.table.updatedAt:Updated At`,
    search: $localize`:@@common.table.search:Search`,
    filter: $localize`:@@common.table.filter:Filter`,
    sort: $localize`:@@common.table.sort:Sort`
  };

  /**
   * Time-related translations
   */
  readonly time = {
    now: $localize`:@@common.time.now:now`,
    minutesAgo: $localize`:@@common.time.minutesAgo:min ago`,
    hoursAgo: $localize`:@@common.time.hoursAgo:hours ago`,
    daysAgo: $localize`:@@common.time.daysAgo:days ago`,
    today: $localize`:@@common.time.today:Today`,
    yesterday: $localize`:@@common.time.yesterday:Yesterday`,
    thisWeek: $localize`:@@common.time.thisWeek:This week`,
    thisMonth: $localize`:@@common.time.thisMonth:This month`,
    lastMonth: $localize`:@@common.time.lastMonth:Last month`
  };
}
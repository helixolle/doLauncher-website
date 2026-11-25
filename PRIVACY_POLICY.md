# doLauncher Privacy Policy

Effective date: 25 November 2026

Developer: doStudio

Privacy contact: [olledavegardh@gmail.com](mailto:olledavegardh@gmail.com)

Android package: `com.dostudio.launcher`

## 1. Overview

doLauncher is an Android home-screen launcher with app search, tasks, notes, an agenda and an optional step counter. It does not require an account.

The app primarily processes information locally. It does not include advertising, remote usage analytics or an automatic crash-reporting service, and does not send your tasks, notes, contacts, calendar events or step counts to a developer-operated backend.

This does not mean that information can never leave your device. Android backups, device transfers, a document provider you choose, and other apps you explicitly open can handle information as described below.

## 2. Information used on your device

### Tasks and reminders

Task text, list names, ordering, completion status, creation and completion times, recurrence rules and reminder settings are stored in the app's private on-device database. Reminders use Android's local alarm and notification services, not a remote push server. Android battery restrictions can delay delivery.

When you enable a reminder notification, its task title is provided to Android's notification system. The app marks notification content as private, but lock-screen visibility, connected-device display and access by authorised notification-listener apps depend on your system settings.

### Notes and your selected storage location

The current note draft is automatically saved in private app storage. Closing the editor keeps the draft. Switching from Search to Note can use your current search text as the beginning of an empty draft.

Choosing Save .md creates a readable UTF-8 Markdown file in the folder you selected through Android's document picker. The app retains the folder URI and the access grant so you can save further notes there.

The location may be local storage, a synchronised folder or a third-party cloud document provider. The provider receives the note content and filename and may upload or synchronise them under its own terms and privacy policy. doStudio does not operate that storage service.

### Preferences, home-screen apps and folders

The app stores appearance preferences, selected apps, custom labels, folder names and ordering, note-storage location, step goals and reminder preferences locally. Saved app entries can include package names, launchable activity components and an Android user/profile-local serial number used to distinguish entries.

### Installed apps, shortcuts and local search ranking

To find and launch apps, doLauncher reads names, package names, launchable activity components and availability in the current Android user profile. It observes package changes to keep this list current.

Where Android permits shortcut access, the app reads shortcut identifiers, labels and associated launch information supplied by other apps. These labels can contain personalised information. The app does not read other apps' private databases or monitor their screen contents.

For ordinary apps successfully opened from search results, doLauncher locally stores the package name, number of launches and latest launch time to rank later results. It does not measure how long you use other apps or send this ranking information to an analytics service.

There is no persistent search-history log. Current search text and small editing drafts may temporarily be retained through Android's interface-state restoration.

### Contacts

If you enable contact search and grant Contacts permission, the app reads matching contact names, phone numbers and contact identifiers from Android's contacts provider. Search results are used locally; the app does not maintain its own persistent contact-book copy.

Choosing Call passes the selected number to a dialler app. Choosing Text passes it to a messaging app. doLauncher does not itself place the call or send the message, and does not read call logs or message contents.

### Calendar and alarms

With Calendar permission, the app reads event identifiers, titles, start and end times and all-day status for its upcoming seven-day agenda. It can also read the time of the next Android alarm.

Hiding an agenda item saves its source, identifier, title, start time and all-day status in the app's database so you can manage hidden items. These records can remain after the original event is changed or removed. Opening an event passes its identifier and relevant times to a calendar app. doLauncher does not directly modify your calendar.

### Steps and physical activity

On supported devices, doLauncher reads the step-counter sensor. Starting with version 1.0, build 2, on Android 10 and later Physical activity permission is requested only after you choose to enable the feature, not automatically at app startup. The initial build 1 requested this permission at startup. You can cancel or deny the request.

The app stores a sensor baseline, the current step day and count, your goal and reset time locally. It does not maintain a multi-day fitness history or use Health Connect or Google Fit.

Sensor listening runs while Home is active and the launcher activity is started, and stops when you leave Home or the activity stops. There is no continuous background fitness-tracking service. Android's sensor supplies a cumulative count, so later readings can reflect steps recorded by the device between readings.

Show steps on Home controls display, not permission. Hiding the counter does not itself revoke access or erase stored values. On older Android versions that do not require this runtime permission, a supported sensor can be used without a permission dialog.

## 3. Permissions and your choices

- Calendar: optional access to display calendar events.
- Contacts: optional access for contact search.
- Physical activity: optional access to the step-counter sensor on Android 10 and later.
- Notifications: optional task reminder notifications, with a runtime permission on Android 13 and later.
- Boot completion: restoring local schedules after a device restart.

The app also uses Android's home-app role, available launcher shortcut access and a persistent access grant for your selected notes folder. It does not request unrestricted file access or internet permission.

You can refuse optional permissions and use features that do not depend on them. Manage permissions through Android's Settings, Apps, doLauncher, Permissions. Revoking a permission does not automatically erase information already stored locally.

## 4. Android backup and device transfer

doLauncher allows Android Auto Backup and device-to-device transfer. No app-data exclusions are configured. Depending on your device, backup provider and settings, this can include tasks, reminders, preferences, home-screen configuration, app-launch statistics, step-counter state, hidden agenda records and the note draft.

Android may upload a backup to your Google account or another device-supported backup provider, or transfer app data when you set up another device. These services are not operated by doStudio. Their security, storage locations, retention and deletion are governed by the provider and your settings.

Backup data can be restored when you reinstall the app or set up another device. The developer does not receive access to your backup through this feature.

## 5. Other apps, libraries and services

doLauncher uses Android and AndroidX libraries for its interface, lifecycle, local database, preferences and notifications, Kotlin libraries, and Calvin Reorderable for reordering. These are not integrated as advertising or remote analytics services.

AndroidX EmojiCompat may request an emoji font from a system-installed font provider. This uses a fixed font request, not your note, task, contact or search text. The provider may obtain font resources through its own services.

Information is handed to a dialler, messaging app, calendar app or document provider when you use the corresponding action. Their subsequent processing is governed by their own policies. Android, Google Play, your keyboard and other independently operated services can also process information under their own policies and settings.

doStudio does not sell your personal data or use the app's personal information for advertising.

## 6. Storage and security

Private data is stored within Android's app sandbox. The app does not add its own encryption layer to the database, preferences or note draft. Device-level protection depends on Android, your device and your screen-lock settings.

Exported Markdown files are readable text. Their protection depends on the storage location, access permissions and provider you choose.

Some operational errors and exceptions are written to Android's local system log. The app has no service that automatically uploads these logs to the developer.

## 7. Retention and deletion

Tasks, lists, preferences, home-screen configuration, local app-launch statistics and hidden agenda records have no automatic time-based expiry. They remain until changed, removed or cleared with the app's private storage.

- Delete individual tasks or use the applicable Clear completed action. Marking a task done does not delete it.
- Deleting a list moves its tasks and agenda dates to Inbox rather than deleting those tasks.
- Use Restore or Restore all in Hidden Agenda Events to remove the saved hiding records and their metadata. This does not delete original calendar events.
- Clear the note editor to remove its draft contents. A successful Markdown export removes the private draft, but not the exported file.
- Delete exported notes with your file manager or storage provider. They normally remain after the app is uninstalled.
- Use Health & steps, Reset today's count to reset the current counter. Current step state is also reset or replaced as the app processes a new step day; there is no multi-day step-history database.

Deleted task content can temporarily remain in the in-memory undo/redo history, which holds up to 100 changes. Removing a record does not promise forensic secure erasure of underlying storage.

To remove all private app data, including local app-launch statistics, use Android Settings, Apps, doLauncher, Storage, Clear storage or Clear data. Uninstalling normally also removes private app data. Clearing the cache alone is not sufficient.

These actions do not delete exported files, original contacts, original calendar events or copies held by backup and storage providers. Manage those copies through the relevant service. A later backup restore can bring back previously saved app data.

There are no doLauncher accounts or developer-hosted copies of your app database to delete remotely.

## 8. This website and privacy enquiries

This policy website is hosted on GitHub Pages. We do not add tracking scripts, analytics, cookies, advertising or third-party fonts to it. GitHub states that it logs visitors' IP addresses for security, whether or not they are signed in. See the [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).

If you email us, your email address and the information you choose to send are available to doStudio and the email service used to handle your enquiry. Please do not send sensitive note, contact or health information unnecessarily. Enquiries are used to respond to and manage the request; you can contact us to ask about or request deletion of that correspondence, subject to applicable legal requirements.

You control data held only on your device through the actions above. Where applicable privacy law gives you rights concerning information held by us, such as access, correction, deletion or a complaint to a supervisory authority, contact us at [olledavegardh@gmail.com](mailto:olledavegardh@gmail.com).

## 9. Changes and contact

This policy may be updated when the app or its data practices change. The effective date above identifies this version.

For privacy questions about doLauncher, contact doStudio at [olledavegardh@gmail.com](mailto:olledavegardh@gmail.com).

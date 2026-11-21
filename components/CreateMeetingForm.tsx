'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { createMeeting, type MeetingState } from '@/lib/actions';

const initialState: MeetingState = { message: null, errors: {} };

export default function CreateMeetingForm() {
  const [state, formAction, isPending] = useActionState(createMeeting, initialState);

  return (
    <form
      action={formAction}
      className="space-y-6 bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-xl shadow-xl max-w-3xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-slate-200 mb-1">
            Meeting Date (YYYY-MM-DD) <span className="text-blue-400">*</span>
          </label>
          <input
            id="date"
            name="date"
            type="date"
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-describedby="date-error"
            required
          />
          <div id="date-error" aria-live="polite" aria-atomic="true">
            {state.errors?.date?.map((error) => (
              <p key={error} className="mt-1 text-xs text-rose-400 font-medium">{error}</p>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="meetingType" className="block text-sm font-medium text-slate-200 mb-1">
            Meeting Type <span className="text-blue-400">*</span>
          </label>
          <select
            id="meetingType"
            name="meetingType"
            defaultValue="regular"
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-describedby="meetingType-error"
            required
          >
            <option value="regular">Regular Sacrament</option>
            <option value="testimony">Fast & Testimony</option>
            <option value="stake">Stake Conference</option>
            <option value="general">General Conference</option>
            <option value="special">Special Meeting</option>
          </select>
          <div id="meetingType-error" aria-live="polite" aria-atomic="true">
            {state.errors?.meetingType?.map((error) => (
              <p key={error} className="mt-1 text-xs text-rose-400 font-medium">{error}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="presiding" className="block text-sm font-medium text-slate-200 mb-1">
            Presiding Leader <span className="text-blue-400">*</span>
          </label>
          <input
            id="presiding"
            name="presiding"
            type="text"
            placeholder="e.g. Bishop Ricardo Morales"
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-describedby="presiding-error"
            required
          />
          <div id="presiding-error" aria-live="polite" aria-atomic="true">
            {state.errors?.presiding?.map((error) => (
              <p key={error} className="mt-1 text-xs text-rose-400 font-medium">{error}</p>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="conducting" className="block text-sm font-medium text-slate-200 mb-1">
            Conducting Leader <span className="text-blue-400">*</span>
          </label>
          <input
            id="conducting"
            name="conducting"
            type="text"
            placeholder="e.g. Brother Carlos Silva"
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-describedby="conducting-error"
            required
          />
          <div id="conducting-error" aria-live="polite" aria-atomic="true">
            {state.errors?.conducting?.map((error) => (
              <p key={error} className="mt-1 text-xs text-rose-400 font-medium">{error}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Opening Services */}
      <div className="border-t border-slate-800 pt-4">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Opening Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="openingHymnNumber" className="block text-xs text-slate-300 mb-1">Opening Hymn #</label>
            <input
              id="openingHymnNumber"
              name="openingHymnNumber"
              type="number"
              placeholder="e.g. 2"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-sm"
              aria-describedby="openingHymnNumber-error"
              required
            />
            <div id="openingHymnNumber-error" aria-live="polite" aria-atomic="true">
              {state.errors?.openingHymnNumber?.map((e) => (
                <p key={e} className="mt-1 text-xs text-rose-400 font-medium">{e}</p>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="openingHymnTitle" className="block text-xs text-slate-300 mb-1">Opening Hymn Title</label>
            <input
              id="openingHymnTitle"
              name="openingHymnTitle"
              type="text"
              placeholder="e.g. The Spirit of God"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-sm"
              aria-describedby="openingHymnTitle-error"
              required
            />
            <div id="openingHymnTitle-error" aria-live="polite" aria-atomic="true">
              {state.errors?.openingHymnTitle?.map((e) => (
                <p key={e} className="mt-1 text-xs text-rose-400 font-medium">{e}</p>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="openingPrayer" className="block text-xs text-slate-300 mb-1">Opening Prayer By</label>
            <input
              id="openingPrayer"
              name="openingPrayer"
              type="text"
              placeholder="e.g. Sister Maria Williams"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-sm"
              aria-describedby="openingPrayer-error"
              required
            />
            <div id="openingPrayer-error" aria-live="polite" aria-atomic="true">
              {state.errors?.openingPrayer?.map((e) => (
                <p key={e} className="mt-1 text-xs text-rose-400 font-medium">{e}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sacrament Hymn */}
      <div className="border-t border-slate-800 pt-4">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Sacrament</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="sacramentHymnNumber" className="block text-xs text-slate-300 mb-1">Sacrament Hymn #</label>
            <input
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              type="number"
              placeholder="e.g. 169"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-sm"
              aria-describedby="sacramentHymnNumber-error"
              required
            />
            <div id="sacramentHymnNumber-error" aria-live="polite" aria-atomic="true">
              {state.errors?.sacramentHymnNumber?.map((e) => (
                <p key={e} className="mt-1 text-xs text-rose-400 font-medium">{e}</p>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="sacramentHymnTitle" className="block text-xs text-slate-300 mb-1">Sacrament Hymn Title</label>
            <input
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              type="text"
              placeholder="e.g. In Remembrance of Thy Suffering"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-sm"
              aria-describedby="sacramentHymnTitle-error"
              required
            />
            <div id="sacramentHymnTitle-error" aria-live="polite" aria-atomic="true">
              {state.errors?.sacramentHymnTitle?.map((e) => (
                <p key={e} className="mt-1 text-xs text-rose-400 font-medium">{e}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Speakers and Announcements */}
      <div className="border-t border-slate-800 pt-4 space-y-4">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Speakers & Program</h3>
        <div>
          <label htmlFor="speakers" className="block text-xs text-slate-300 mb-1">
            Speakers (One per line, optional format: Name - Topic)
          </label>
          <textarea
            id="speakers"
            name="speakers"
            rows={3}
            placeholder="Sister Elena Vance - Finding Peace in the Savior&#10;Brother Matthew Taylor - Discipleship"
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-sm"
          />
        </div>

        <div>
          <label htmlFor="announcements" className="block text-xs text-slate-300 mb-1">
            Announcements (One per line)
          </label>
          <textarea
            id="announcements"
            name="announcements"
            rows={2}
            placeholder="Ward Temple Night this Friday at 7:00 PM&#10;Youth activity on Wednesday"
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-sm"
          />
        </div>

        <div>
          <label htmlFor="wardBusiness" className="block text-xs text-slate-300 mb-1">
            Ward Business (One item per line, e.g. Sustaining of Brother John Doe)
          </label>
          <textarea
            id="wardBusiness"
            name="wardBusiness"
            rows={2}
            placeholder="Sustaining of Brother David Clark as Sunday School Teacher"
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-sm"
          />
        </div>
      </div>

      {/* Closing Services */}
      <div className="border-t border-slate-800 pt-4">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Closing Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="closingHymnNumber" className="block text-xs text-slate-300 mb-1">Closing Hymn #</label>
            <input
              id="closingHymnNumber"
              name="closingHymnNumber"
              type="number"
              placeholder="e.g. 31"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-sm"
              aria-describedby="closingHymnNumber-error"
              required
            />
            <div id="closingHymnNumber-error" aria-live="polite" aria-atomic="true">
              {state.errors?.closingHymnNumber?.map((e) => (
                <p key={e} className="mt-1 text-xs text-rose-400 font-medium">{e}</p>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="closingHymnTitle" className="block text-xs text-slate-300 mb-1">Closing Hymn Title</label>
            <input
              id="closingHymnTitle"
              name="closingHymnTitle"
              type="text"
              placeholder="e.g. O God, Our Help in Ages Past"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-sm"
              aria-describedby="closingHymnTitle-error"
              required
            />
            <div id="closingHymnTitle-error" aria-live="polite" aria-atomic="true">
              {state.errors?.closingHymnTitle?.map((e) => (
                <p key={e} className="mt-1 text-xs text-rose-400 font-medium">{e}</p>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="closingPrayer" className="block text-xs text-slate-300 mb-1">Closing Prayer By</label>
            <input
              id="closingPrayer"
              name="closingPrayer"
              type="text"
              placeholder="e.g. Brother Antonio Davis"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-sm"
              aria-describedby="closingPrayer-error"
              required
            />
            <div id="closingPrayer-error" aria-live="polite" aria-atomic="true">
              {state.errors?.closingPrayer?.map((e) => (
                <p key={e} className="mt-1 text-xs text-rose-400 font-medium">{e}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {state.message && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm rounded-lg" role="alert">
          {state.message}
        </div>
      )}

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
        <Link
          href="/meetings"
          className="px-4 py-2 text-sm text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="px-5 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors disabled:opacity-50"
        >
          {isPending ? 'Saving...' : 'Save Meeting Agenda'}
        </button>
      </div>
    </form>
  );
}

import { Offer } from '../types';

export const offersData: Offer[] = [
  {
    id: 'track-pass-2026',
    title: 'Track Day Experience',
    subtitle: 'Complimentary High-Performance Pro Coaching',
    badge: 'EXCLUSIVE PERK',
    discount: '100% FREE',
    code: 'READY2TRACK',
    validTill: 'Limited Time Offer',
    description: 'Get a complimentary full-day circuit training session with certified track coaches and paddock access with any new Duke 390 purchase.',
    eligibleBikes: ['KTM 390 Duke']
  },
  {
    id: 'apr-zero-finance',
    title: '0.0% APR Introductory Financing',
    subtitle: '24 Months Zero Interest Rate',
    badge: 'FINANCE SPECIAL',
    discount: '0% APR',
    code: 'ZEROINTEREST',
    validTill: 'Ends this month',
    description: 'Finance your brand-new KTM 125 Duke or 200 Duke with zero down payment options and 0.0% APR financing up to 24 months.',
    eligibleBikes: ['KTM 125 Duke', 'KTM 200 Duke']
  },
  {
    id: 'powerparts-voucher',
    title: 'PowerParts Performance Pack',
    subtitle: '$650 Official Accessories Credit',
    badge: 'UPGRADE BONUS',
    discount: '$650 VOUCHER',
    code: 'QUICKSHIFT650',
    validTill: 'Next 14 Days',
    description: 'Upgrade your weapon with an authentic Quickshifter+ module, ergonomic pillion seat cowl, and bar-end mirrors at no additional cost.',
    eligibleBikes: ['KTM 250 Duke', 'KTM 390 Duke']
  },
  {
    id: 'tradein-exchange-boost',
    title: 'Supermoto Trade-In Bonus',
    subtitle: 'Guaranteed Over-Market Valuation',
    badge: 'EXCHANGE BONUS',
    discount: '+$800 VALUE',
    code: 'BOOSTEXCHANGE',
    validTill: 'Ongoing Season',
    description: 'Trade in any make or model of motorcycle and receive an instant $800 boost on top of fair market trade evaluation value.',
    eligibleBikes: ['KTM 125 Duke', 'KTM 200 Duke', 'KTM 250 Duke', 'KTM 390 Duke']
  }
];

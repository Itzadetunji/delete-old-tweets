export type BadKeywordCategory = {
	keywords: string[];
	variations: string[];
	phrases: string[];
};

export const BAD_KEYWORDS: Record<string, BadKeywordCategory> = {
	racial_ethnic_slurs: {
		keywords: [
			"spic",
			"wetback",
			"beaner",
			"redskin",
			"injun",
			"honky",
			"white trash",
			"wop",
			"dago",
			"gyppo",
		],
		variations: ["w3tb4ck", "be4ner", "sp1c", "h0nky", "r3dsk1n"],
		phrases: [
			"go back to your country",
			"send them back",
			"your kind does not belong here",
			"racial purity",
			"ethnic cleansing",
		],
	},

	anti_black_slurs: {
		keywords: [
			"nigger",
			"nigga",
			"coon",
			"jigaboo",
			"sambo",
			"porch monkey",
			"monkey people",
			"spear chucker",
			"tar baby",
			"black brute",
		],
		variations: [
			"n1gger",
			"n!gger",
			"n*gger",
			"ni99er",
			"n-word",
			"n_word",
			"n1gga",
			"n*gga",
			"niqqa",
		],
		phrases: [
			"lynch them",
			"black people are animals",
			"segregation was better",
			"white power over blacks",
			"keep neighborhoods white",
		],
	},

	antisemitic_slurs_tropes: {
		keywords: [
			"kike",
			"yid",
			"heeb",
			"christ killer",
			"zionist pig",
			"hooknosed",
			"shekel grabber",
			"jew lover",
			"jewboy",
			"khazar mafia",
		],
		variations: ["k1ke", "k*ke", "y1d", "h33b", "j3wboy"],
		phrases: [
			"jews control the media",
			"jews control the banks",
			"jews will not replace us",
			"holocaust was a lie",
			"zionist occupied government",
			"global jewish cabal",
		],
	},

	islamophobic_terms: {
		keywords: [
			"raghead",
			"towelhead",
			"camel jockey",
			"sand nigger",
			"muzzie",
			"paki",
			"islamofascist",
			"terrorist religion",
			"muslim invader",
			"sharia freak",
		],
		variations: ["r4ghead", "tow3lhead", "muzz1e", "p4ki", "sh4ria freak"],
		phrases: [
			"all muslims are terrorists",
			"ban all muslims",
			"islam is a disease",
			"deport muslims",
			"mosques should be shut down",
		],
	},

	anti_asian_slurs: {
		keywords: [
			"chink",
			"gook",
			"zipperhead",
			"slope",
			"yellow monkey",
			"dog eater",
			"rice monkey",
			"ching chong",
			"kung flu",
			"bat eater",
		],
		variations: ["ch1nk", "ch*nk", "g00k", "z1pperhead", "k*ng flu"],
		phrases: [
			"asians are taking over",
			"go back to china",
			"chinese virus people",
			"jap scum",
			"exterminate the asians",
		],
	},

	homophobic_anti_gay_slurs: {
		keywords: [
			"faggot",
			"fag",
			"dyke",
			"poof",
			"queerbait freak",
			"sodomite",
			"fairy boy",
			"homo freak",
			"fruitcake",
			"batty boy",
		],
		variations: ["f4ggot", "f*ggot", "fa99ot", "f@g", "dyk3", "d*ke"],
		phrases: [
			"gay people are disgusting",
			"burn the gays",
			"kill all gays",
			"no gays allowed",
			"being gay is a disease",
		],
	},

	transphobic_anti_trans_slurs: {
		keywords: [
			"tranny",
			"shemale",
			"he she",
			"it thing",
			"troon",
			"gender freak",
			"transvestite freak",
			"fake woman",
			"fake man",
			"groomer tr*nny",
		],
		variations: ["tr4nny", "tr*nny", "tr@nny", "sh3male", "tro0n", "h3 she"],
		phrases: [
			"trans people are predators",
			"eradicate transgenderism",
			"they are not human",
			"remove trans rights",
			"trans people should die",
		],
	},

	misogynistic_sexist_slurs_and_violence: {
		keywords: [
			"bitch",
			"slut",
			"whore",
			"cunt",
			"femoid",
			"roastie",
			"cumdumpster",
			"stupid broad",
			"feminazi",
			"dishwasher",
		],
		variations: ["b1tch", "wh0re", "c*nt", "f3moid", "sl*t", "cumd*mpster"],
		phrases: [
			"women should be property",
			"women deserve to be hit",
			"rape her",
			"she asked for it",
			"women should not vote",
			"keep women in the kitchen",
		],
	},

	strong_profanity_and_explicit_sexual_terms: {
		keywords: [
			"motherfucker",
			"cocksucker",
			"cumshot",
			"facial",
			"deepthroat",
			"blowbang",
			"gangbang",
			"creampie",
			"anal slut",
			"rape porn",
			"bestiality",
			"incest porn",
		],
		variations: [
			"m0therfucker",
			"c0cksucker",
			"d33pthroat",
			"g4ngbang",
			"cr3ampie",
		],
		phrases: [
			"forced sex video",
			"non consensual porn",
			"rape fantasy porn",
			"drugged and used",
			"underage porn",
		],
	},

	dehumanizing_animal_group_comparisons: {
		keywords: [
			"vermin",
			"cockroaches",
			"rats",
			"parasites",
			"infestation",
			"subhuman",
			"filthy animals",
			"plague carriers",
			"disease spreaders",
		],
		variations: ["v3rmin", "c0ckroaches", "r4ts", "p4rasites", "subh*man"],
		phrases: [
			"they are not human",
			"exterminate the vermin",
			"cleanse the infestation",
			"treat them like pests",
			"human garbage",
		],
	},

	violent_group_harm_calls: {
		keywords: [
			"gas them",
			"shoot them all",
			"hang them",
			"wipe them out",
			"burn them alive",
			"genocide now",
			"final solution",
			"kill squad",
			"death to",
		],
		variations: [
			"g4s them",
			"sh00t them all",
			"h4ng them",
			"w1pe them out",
			"d3ath to",
		],
		phrases: [
			"kill all jews",
			"kill all muslims",
			"kill all blacks",
			"kill all gays",
			"should be gassed",
			"massacre them",
			"they should all die",
		],
	},

	pedophilia_map_euphemisms: {
		keywords: [
			"minor attracted person",
			"minor attracted",
			"boylover",
			"girllover",
			"childlover",
			"lolicon",
			"shotacon",
			"pedo pride",
			"child sex advocate",
		],
		variations: ["m.a.p.", "m4p pride", "b0ylover", "g1rllover", "ch1ldlover"],
		phrases: [
			"age is just a number",
			"children can consent",
			"normalize pedophilia",
			"attracted to minors",
			"pro child sex",
		],
	},

	extreme_conspiracy_hate_terms: {
		keywords: [
			"globalist cabal",
			"white genocide",
			"great replacement",
			"cultural marxism",
			"kalergi plan",
			"race war now",
			"blood and soil",
			"ethnostate now",
			"zionist puppet",
		],
		variations: [
			"gl0balist cabal",
			"wh1te gen0cide",
			"gr34t replacement",
			"bl00d and soil",
			"ethn0state",
		],
		phrases: [
			"replace the natives",
			"they are breeding us out",
			"racial superiority",
			"purge the traitors",
			"remove impure blood",
		],
	},

	ableist_slurs: {
		keywords: [
			"retard",
			"retarded",
			"mongoloid",
			"spaz",
			"spastic",
			"window licker",
			"cripple",
			"brain damaged freak",
			"vegetable person",
		],
		variations: ["r3tard", "ret4rded", "sp4z", "sp*stic", "cr1pple"],
		phrases: [
			"eugenics was right",
			"disabled people are useless",
			"they should be sterilized",
			"lock away the disabled",
			"not fit to live",
		],
	},

	anti_religious_slurs: {
		keywords: [
			"christcuck",
			"sky fairy cult",
			"bible thumper trash",
			"pedo priest cult",
			"allah cultist",
			"momo worshipper",
			"kafir dog",
			"infidel pig",
			"idol worshipping scum",
		],
		variations: [
			"chr1stcuck",
			"sky f4iry cult",
			"p3do priest",
			"k4fir dog",
			"inf1del pig",
		],
		phrases: [
			"all believers are idiots",
			"burn every church",
			"destroy every mosque",
			"wipe out all religions",
			"religious people are vermin",
		],
	},
};

const flattenCategory = (category: BadKeywordCategory) => [
	...category.keywords,
	...category.variations,
	...category.phrases,
];

export const ALL_BAD_PATTERNS: string[] = Array.from(
	new Set(
		Object.values(BAD_KEYWORDS)
			.flatMap(flattenCategory)
			.map((item) => item.trim())
			.filter(Boolean),
	),
);

const escapeRegex = (value: string) =>
	value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const createTermRegex = (term: string) => {
	const escaped = escapeRegex(term).replace(/\s+/g, "\\s+");
	return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`);
};

const OBFUSCATED_WORST_SLUR_REGEXES: RegExp[] = [
	/\bn[\W_]*[i1!|][\W_]*g[\W_]*g[\W_]*[e3][\W_]*r\b/,
	/\bn[\W_]*[i1!|][\W_]*g[\W_]*g[\W_]*[a4@]\b/,
	/\bf[\W_]*[a4@][\W_]*g[\W_]*g[\W_]*[o0][\W_]*t\b/,
	/\bt[\W_]*r[\W_]*[a4@][\W_]*n[\W_]*n[\W_]*y\b/,
	/\bk[\W_]*[i1!|][\W_]*k[\W_]*e\b/,
	/\bc[\W_]*h[\W_]*[i1!|][\W_]*n[\W_]*k\b/,
	/\br[\W_]*[e3][\W_]*t[\W_]*[a4@][\W_]*r[\W_]*d\b/,
	/\bs[\W_]*p[\W_]*[i1!|][\W_]*c\b/,
	/\bw[\W_]*[e3][\W_]*t[\W_]*b[\W_]*[a4@][\W_]*c[\W_]*k\b/,
];

const COMPILED_BAD_REGEXES: RegExp[] = [
	...ALL_BAD_PATTERNS.map(createTermRegex),
	...OBFUSCATED_WORST_SLUR_REGEXES,
];

export function isProbablyBad(text: string): boolean {
	const lower = text.toLowerCase();
	return COMPILED_BAD_REGEXES.some((regex) => regex.test(lower));
}

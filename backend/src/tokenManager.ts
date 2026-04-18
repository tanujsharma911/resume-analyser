
/**
 * TokenManager class to manage blacklisted tokens for logout functionality
 */
class TokenManager {
    private tokens: Set<string>;

    constructor() {
        this.tokens = new Set();
    }

    blacklist(token: string) {
        this.tokens.add(token);
    }

    isBlacklisted(token: string): boolean {
        return this.tokens.has(token);
    }
};

const tokenManager = new TokenManager();

export default tokenManager;